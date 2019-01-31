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

connection.connect((err) => {
  dashBoard();
});

function queryAllProducts() {
  const query = "SELECT * FROM products"
  connection.query(query, function (err, res) {
    console.table(res);
  });
};

function queryLowInventory() {
  const query = "SELECT * FROM products"
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        console.log(res[i].product_name + " X" + res[i].stock_quantity);
      };
    };
  });
};

function addStock() {
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
          stock_quantity: quantity
        },
        function (err) {
          if (err) throw err;
        }
      )
    });

  function dashBoard() {
    inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View product list', 'View low inventory', 'Add to inventory stock', 'Add new product']
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
      }
    })
  }
};