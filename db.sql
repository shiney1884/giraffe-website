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
    categoryID INT NOT NULL,
    productID INT NOT NULL,

    FOREIGN KEY(customerID) REFERENCES customers(username),
    FOREIGN KEY(productID) REFERENCES products(id),
    FOREIGN KEY(categoryID) REFERENCES categories(id)
);



-- adding data to db

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
