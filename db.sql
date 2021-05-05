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

INSERT INTO artcontestwinners (img, winnername, contest, contestdescription) VALUES 
('winner-2.jpg', 'Kim', 'Red, Blue, Yellow', 'Had to paint something creative with red, blue and yellow'),
('winner-3.jpg', 'Jake', 'Simple', "Had to paint something as simple as possible to test how creative you can be with something simple");

INSERT INTO products (name, description, price, stock, url, imageSrc, categoryID)
VALUES 
('Mini-Canvas', 'A mini canvas for you to do your artistic and creative work on.', 4.00, 45, 'mini-canvas', 'mini-canvas.jpg', 4),
('Canvas 4 Pack', 'A 4 pack of canvases to do your artistic and creative work on.', 4.00, 45, 'canvas-4-pack', '4-pack-canvas.jpg', 4),
('4 Pack of Jumbo Paint Brushes', 'A pack of 4 jumbo paint brushes to help give your paintings the design and look you want.', 7.50, 45, '4-pack-jumbo-paint-brushes', '4-pack-jumbo-paint-brushes.jpg', 4),
('Bristle Paint Brush', 'A bristle paint brush to help give your painting the design and look you want.', 7.00, 45, 'bristle-paint-brush', 'bristle-paint-brush.jpg', 4),
('Mix of 6 Different Paint Brsuhes', 'A mix of 6 different paint brushes to give your paintings more variety and give you more flexiblity.', 20.00, 25, 'mix-of-6-paint-brushes', 'mix-of-6-paint-brushes.jpg', 4);

INSERT INTO categories (name)
VALUES ('Art Equipment'),
('Art'),
('Cards'),
('Bags');

INSERT INTO products (name, description, price, stock, url, imageSrc, categoryID)
VALUES 
('City Wall Art', 'An image of some city wall art.', 7.50, 20, 'city-wall-art', 'art-1.jpg', 14),
('Small Blue Lights', 'An image of many blue lights.', 6.50, 20, 'small-blue-light-art', 'art-2.jpg', 14),
('Wave Art', 'An artists painting of a wave.', 10.00, 30, 'wave-painting', 'art-3.jpg', 14),
('Disneyland Painting', 'An artists painting of Disneyland.', 10.00, 45, 'disneyland-painting', 'art-4.jpg', 14),
('Neighbourhood Painting', 'An artists painting of a neighbourhood.', 8.00, 25, 'neighbourhood-painting', 'art-5.jpg', 14);

INSERT INTO products (name, description, price, stock, url, imageSrc, categoryID)
VALUES 
('Best Friend Birthday Card', 'A card you can gift to one of your loved ones on their birthday!.', 1.00, 40, 'best-friend-birthday-card', 'best-friend-card.jpg', 24),
('Age 30 Birthday Card (Virus Theme)', 'A birthday card you can gift to a loved one who is aged 30!.', 1.00, 40, 'age-30-birthday-card-virus', 'age-30-birthday-card-virus.jpg', 24),
('Light Green Christmas Card', 'A light green Christmas Card you can gift to one of your loved ones on Christmas!.', 1.00, 30, 'light-green-christmas-card', 'light-green-christmas-card.jpg', 24),
('Fiance Christmas Card', 'A christmas card you can gift to your fiance at Christmas.', 1.00, 45, 'fiance-christmas-card', 'fiance-christmas-card.jpg', 24),
('Cat Christmas Card', 'A Christmas with a cat theme to gift to one of your loved ones at Christams.', 1.00, 45, 'cat-christmas-card', 'cat-christmas-card.jpg', 24);

INSERT INTO products (name, description, price, stock, url, imageSrc, categoryID)
VALUES 
('Valentino Bag', 'A designer bag designed and manufactured by Valentino.', 30.00, 40, 'valentino-bag', 'valentino-bag.jpg', 34),
('Thule Boarding Bag', 'A boarding bag that can be used as luggage on a flight etc..', 12.00, 40, 'thule-boarding-bag', 'thule-boarding.jpg', 34),
('2 O Bags', '2 bags designed and manufactured by O.', 25.00, 30, 'pair-o-bag', 'pair-o-bag.jpg', 34),
('GG Marmont Mini Shoulder Bag', 'A mini shoulder bag designed and manufactured by GG Marmont.', 31.00, 45, 'gg-marmont-mini-shoulder-bag', 'gg-marmont-mini-shoulder-bag.jpg', 34),
('High Spirit Bag', 'A bag designed and manufactured by High Spirit.', 10.00, 45, 'high-spirit-bag', 'high-spirit-bag.jpg', 34);