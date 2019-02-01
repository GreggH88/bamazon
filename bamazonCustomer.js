const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password:"08816674b",
  database: "bamazon_db"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();

});


function queryAllProducts() {
  const query = "SELECT * FROM products"
  connection.query(query, function (err, res) {
    console.table(res);
    newPurchase();
  });
}

function newPurchase() {
  inquirer.prompt([{
    name: "item_id",
    message: "What is the item id of the product you would like to order?"
  }, {
    name: "quantity",
    message: "How many would you like to purchase?"
  }]).then(answers => {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {
        item_id: answers.item_id
      },
      function (err, res) {
        if (res[0].stock_quantity >= answers.quantity) {
          const total = res[0].price * answers.quantity;

          console.log(`Purchase of ${answers.quantity} ${res[0].product_name}(s) confirmed for $${total}!\n`);

          const order = parseInt(res[0].stock_quantity) - parseInt(answers.quantity);

          connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: order
              },
              {
                item_id: answers.item_id
              }
            ],
            err => {
              if (err) throw err;
            })
          queryAllProducts();
        } else {
          console.log("\nThere is not enough in stock. Please place a different order.");
          console.log("*******************************\n")
          queryAllProducts();
        }
      });
  });
};