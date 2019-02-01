const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "08816674b",
  database: "bamazon_db"
});

connection.connect(err => {
  dashBoard();
});

function queryAllProducts() {
  const query = "SELECT * FROM products"
  connection.query(query, function (err, res) {
    console.table(res);
    dashBoard();
  });
};

function queryLowInventory() {
  const query = "SELECT * FROM products"
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        console.log("\n" + res[i].product_name + " X" + res[i].stock_quantity);
      };
    };
    dashBoard();
  });
};

function addStock() {
  inquirer.prompt([{
      name: "item_id",
      type: "input",
      message: "Please enter an item ID to increase stock count."
    },
    {
      name: "quantity",
      type: "input",
      message: "Increase stock quantity by how many units?"
    }
  ]).then((answers => {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {
        item_id: answers.item_id
      },
      function (err, res) {
        const stockUpdate = parseInt(res[0].stock_quantity) + parseInt(answers.quantity);

        connection.query("UPDATE products SET ? WHERE ?",
          [{
              stock_quantity: stockUpdate
            },
            {
              item_id: answers.item_id
            }
          ],
          err => {
            if (err) throw err;
          })
        queryAllProducts();
      })
  }))
};

function addProduct() {
  inquirer
    .prompt([{
        name: "item",
        type: "input",
        message: "Please enter product name to be added to stock."
      },
      {
        name: "department",
        type: "input",
        message: "Please enter department of the item to be added to stock."
      },
      {
        name: "price",
        type: "input",
        message: "Please enter product price."
      },
      {
        name: "quantity",
        type: "input",
        message: "Please enter the inital stock count."
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO products SET ?", {
          product_name: answer.item,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function (err) {
          if (err) throw err;
        }
      );
      console.log()
    })
  dashBoard();
};

function exitOption() {
  connection.end(function (err) {
    // The connection is terminated now
  });
}

function dashBoard() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View product list', 'View low inventory', 'Add to inventory stock', 'Add new product', 'Exit']
  }).then(answer => {
    switch (answer.action) {
      case 'View product list':
        queryAllProducts();
        break;

      case 'View low inventory':
        queryLowInventory();
        break;

      case 'Add to inventory stock':
        addStock();
        break;

      case 'Add new product':
        addProduct();
        break;

      case 'Exit':
        exitOption();
        break;
    };
  });
};