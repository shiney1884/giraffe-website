CREATE TABLE customers(
    username VARCHAR(30) PRIMARY KEY,
    email VARCHAR(90),
    password VARCHAR(30)
);

CREATE TABLE artcontestwinners(
    id VARCHAR(30) PRIMARY KEY,
    img VARCHAR(60) NOT NULL UNIQUE,
    winnername VARCHAR(60) NOT NULL,
    contest VARCHAR(60) NOT NULL,
    contestdescription VARCHAR(260) NOT NULL
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
('Beige Notebook', 'A beige notebook for you to write down ideas, dates to remember or important information.', 4.00, 45, 'beige-notebook', 'beige-notebook.jpg', 3),
('Red Notebook', 'A red notebook for you to write down ideas, dates to remember or important information.', 4.00, 45, 'red-notebook', 'red-notebook.jpg', 3),
('Purple Notebook', 'A purple notebook for you to write down ideas, dates to remember or important information.', 4.00, 45, 'purple-notebook', 'purple-notebook.jpg', 3),
('A5 Mixed Colour Notebook', 'An A5 notebook for you to write down ideas, dates to remember or important information.', 4.50, 45, 'a5-mixed-notebook', 'a5-blue-red-notebook.jpg', 3),
('3 Pack of Notebooks', 'A pack of 3 notebooks for you to write down ideas, dates to remember or important information.', 10.00, 25, '3-pack-of-notebooks', 'pack-of-3-notebooks.jpg', 3);

ALTER TABLE artcontestwinners MODIFY id id INT NOT NULL AUTO_INCREMENT;

CREATE TABLE artcontestwinners(
    id VARCHAR(30) PRIMARY KEY,
    img VARCHAR(60) NOT NULL UNIQUE,
    winnername VARCHAR(60) NOT NULL,
    contest VARCHAR(60) NOT NULL,
    contestdescription VARCHAR(260) NOT NULL
);

INSERT INTO artcontestwinners (img, winnername, contest, contestdescription) VALUES ('winner-1.jpg', 'Catherine', 'Paint Mix', 'Had to paint something creative with a mix of colours');