DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INTEGER(6) NOT NULL PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cherry Stuffed Olives", "Produce", 1.99, 4000),
      ("Crocodile hide football", "Sports", 49.99, 20000),
      ("Bucket of Purple Ice Cream", "Produce", 9.99, 8000),
      ("Cage for very big Owls", "Pets", 199.99, 3000000),
      ("Satin-lined Red Rubber Boots", "Clothes", 59.99, 4000000),
      ("Hopalong Cassidy Suit", "Clothes", 199.99, 9000000),
      ("Kangaroo Hair Shirt", "Clothes", 749.99, 1000),
      ("Silk Towel", "Bath", 149.99, 1000000),
      ("Big Kitchen Sink", "Kitchen", 499.99, 1),
      ("Hamburger Bun", "Produce", .99, 45202);