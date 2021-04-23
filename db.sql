CREATE TABLE customers(
    username VARCHAR(30) PRIMARY KEY,
    email VARCHAR(90),
    password VARCHAR(30)
);

CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID VARCHAR(30) NOT NULL,
    orderTotal DECIMAL(9,2) NOT NULL,
    dateOfOrder DATE NOT NULL,
    status VARCHAR(12) NOT NULL,
    paymentMethod VARCHAR(30) NOT NULL,
    FOREIGN KEY(customerID) REFERENCES customers(username)
);

CREATE TABLE categories(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(90) NOT NULL
)

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(90) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    stock INT(6) NOT NULL,
    url VARCHAR(30) NOT NULL UNIQUE,
    imageSrc VARCHAR(45) NOT NULL UNIQUE,
    categoryID INT NOT NULL,

    FOREIGN KEY(categoryID) REFERENCES categories(id)
);

CREATE TABLE orderItems(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID VARCHAR(30) NOT NULL,
    productID INT NOT NULL,
    quantity INT(6) NOT NULL,
    price DECIMAL(9,2) NOT NULL,

    FOREIGN KEY(customerID) REFERENCES customers(username),
    FOREIGN KEY(productID) REFERENCES products(id)
);

CREATE TABLE basketItems(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productID INT NOT NULL,
    customerID VARCHAR(30) NOT NULL,
    quantity INT(6) NOT NULL,
    price DECIMAL(9,2) NOT NULL,

    
    FOREIGN KEY(customerID) REFERENCES customers(username),
    FOREIGN KEY(productID) REFERENCES products(id)
);

CREATE TABLE wishlistItems(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID VARCHAR(30) NOT NULL,
    productID INT NOT NULL,

    FOREIGN KEY(customerID) REFERENCES customers(username),
    FOREIGN KEY(productID) REFERENCES products(id),
);

INSERT INTO customers (username, email, password)
VALUES ('shiney1884', 'scott0406@outlook.com','=Fx,UX7UkrD>'),
('shiney04067', 'scott04067@outlook.com', 'U>msFg6hc-h@'),
('shiney0406', 'scott-massie@hotmail.com', 'nr-)Kf8@gQZ9');


INSERT INTO categories (name)
VALUES ('Pens'),
('Pencils'),
('Notebooks');

INSERT INTO products (name, description, price, stock, url, imageSrc, categoryID)
VALUES ('Black Pencil', 'Lorem ipsum dolor sit amet
consectetur adipiscing elit. Aliquam eget massa ac purus dapibus tempor. 
', 20.99, 25, 'black-pencil', 'artcontest-header.jpg', 2),
('Black Pen', 'Lorem ipsum dolor sit amet
consectetur adipiscing elit. Aliquam eget massa ac purus dapibus tempor. 
Nulla tempus tincidunt.', 45.99, 50, 'black-pen', 'stationery-img.jpg', 1),
('Black Notebook', 'Lorem ipsum dolor sit amet 
tortor tortor faucibus erat, eu mattis nisi risus vel sapien. 
Nulla tempus tincidunt.', 5.99, 100, 'black-notebook', 'notebook-img.jpg', 3);



INSERT INTO orders (customerID, orderTotal, dateOfOrder, status, paymentMethod)
VALUES ('shiney1884', 30.00, '2021/03/19', 'Complete', 'Paypal'),
('shiney04067', 50.99, '2021/03/18', 'Pending', 'Debit Card'),
('shiney0406', 10.00, '2021/03/18', 'Delivered', 'Crypto');

INSERT INTO orders (customerID, orderTotal, dateOfOrder, status, paymentMethod )
VALUES ('shiney0406', 20.00, '2021/03/24', 'Complete', 'Paypal'),
('shiney0406', 400.00, '2021/03/20', 'Complete', 'Paypal'),
('shiney0406', 225.00, '2021/03/16', 'Complete', 'Paypal');

INSERT INTO basketItems (productID, customerID, quantity, price)
VALUES (1, 'shiney0406', 2, 20.99),
(2, 'shiney0406', 1, 45.99),
(3, 'shiney0406', 2, 5.99);

INSERT INTO basketItems (productID, customerID, quantity, price)
VALUES (2, 'shiney04067', 10, 20.99),
(3, 'shiney1884', 2, 5.99)

INSERT INTO wishlistItems (customerID, productID)
VALUES ('shiney04067', 1),
('shiney1884', 2);

ALTER TABLE orderItems ADD orderID INT NOT NULL;

ALTER TABLE orderItems ADD FOREIGN KEY(orderID) REFERENCES orders(id);


INSERT INTO orders (customerID, orderTotal, dateOfOrder, status, paymentMethod )
VALUES ('shiney0406', 20.00, '2021/03/24', 'Complete', 'Paypal'),
('anewaccount', 400.00, '2021/03/20', 'Complete', 'Paypal'),
('idkwhattoput', 225.00, '2021/03/16', 'Complete', 'Paypal'),
('shiney04067', 20.00, '2021/03/24', 'Complete', 'Paypal'),
('shiney1884', 400.00, '2021/03/20', 'Complete', 'Paypal'),
('shiney0406', 20.00, '2021/03/30', 'Complete', 'Paypal'),
('anewaccount', 400.00, '2021/03/21', 'Complete', 'Paypal'),
('idkwhattoput', 225.00, '2021/03/17', 'Complete', 'Paypal'),
('shiney04067', 20.00, '2021/03/25', 'Complete', 'Paypal'),
('shiney1884', 400.00, '2021/03/21', 'Complete', 'Paypal');

INSERT INTO orders (customerID, orderTotal, dateOfOrder, status, paymentMethod )
VALUES ('shiney0406', 20.00, '2021/03/30', 'Complete', 'Paypal'),
('anewaccount', 400.00, '2021/03/21', 'Complete', 'Paypal'),
('idkwhattoput', 225.00, '2021/03/17', 'Complete', 'Paypal'),
('shiney04067', 20.00, '2021/03/25', 'Complete', 'Paypal'),
('shiney1884', 400.00, '2021/03/21', 'Complete', 'Paypal');

SELECT * FROM orders WHERE customerID = 'shiney04067' ORDER BY dateOfOrder DESC, id DESC LIMIT 1;

SELECT * FROM products WHERE name LIKE '%pen%';


UPDATE products
SET 
    description = 'A black notebook that can be used for anything you would like. Art, writing etc!',
    price = 2.00,
    stock = 75,
    imageSrc = 'black-notebook.jpg'
WHERE 
    id = 3;


INSERT INTO products (name, description, price, stock, url, imageSrc, categoryID)
VALUES 
('Pack of 4 Pens', 'A pack of 4 pens that are all different colours and are perfect for all types of different activities.', 3.60, 20, '4-pack-pens', '4-pack-pens.jpg', 1),
('Pack of 24 Multi-Coloured Pens', 'A pack of 24 Multi-Coloured Pens where each one is a different colour and are perfect for your artistic activities!', 20.00, 10, '24-pack-multi-coloured-pens', '24-pack-multicolour-pens.jpg', 1),
('Pack of 9 Gel Pens', 'A pack of 9 gel pens that are great for your creative and artistic activities.', 7.20, 20, '9-pack-gel-pens', '9-pack-gel-pens.jpg', 1),
('Single Green Pen', 'A single green pen that is great for your creative and writing activities.', 1.00, 275, 'single-green-pen', 'single-green-pen.jpg', 1),
('Pack of 10 Ballpoint Pens', 'A pack of 10 ballpoint pens that are great for your writing activities.', 9.00, 20, '10-ballpoint-pens', '10-pack-pens.jpg', 1);