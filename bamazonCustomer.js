var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "08816674b",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
  
});


function queryAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
    }
    console.log("-----------------------------------");
    newPurchase();
  });
}

function Order(item_id, quantity) {
  this.item_id = item_id;
  this.quanity = quantity;
}

function newPurchase() {
  inquirer.prompt([{
    name: "item_id",
    message: "What is the item id of the product you would like to order?"
  }, {
    name: "quantity",
    message: "How many would you like to purchase?"
  }]).then(function (answers) {
    // initializes the variable newProgrammer to be a programmer object which will take
    // in all of the user's answers to the questions above
    var newOrder = new Order(answers.item_id, answers.quantity);
    // printInfo method is run to show that the newProgrammer object was successfully created and filled
    console.log(newOrder);
  });
};