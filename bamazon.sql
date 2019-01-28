DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INTEGER(6) NOT NULL PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cherry Stuffed Olives", "Produce", 1.99, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crocodile hide football", "Sports", 49.99, 20000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bucket of Purple Ice Cream", "Produce", 9.99, 8000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cage for very big Owls", "Pets", 199.99, 3000000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Satin-lined Red Rubber Boots", "Clothes", 59.99, 4000000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hopalong Cassidy Suit", "Clothes", 199.99, 9000000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kangaroo Hair Shirt", "Clothes", 749.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silk Towel", "Bath", 149.99, 1000000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Big Kitchen Sink", "Kitchen", 499.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hamburger Bun", "Produce", .99, 45202);

