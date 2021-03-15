const express = require('express');
const mySQL = require('mysql');
const ejs = require('ejs');
const app = express();
let clickedProduct = 'Pencil3';
let searchQuery = 'Pencil';
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('server started on port 3000');
});

app.get('/', (req, res) => {
    let title = 'Home | Giraffe Website';
    res.render('index', {
        title: title
    });
})

app.get(`/${clickedProduct}`, (req, res) => {
    let title = `${clickedProduct} | Giraffe Website`;
    let header = `${clickedProduct}`;
    res.render('products', {
        title: title,
        header: header
    });
});

app.get('/pens', (req, res) => {
    let title = 'Pens | Giraffe Website';
    let header = 'Pens';
    res.render('products', {
        title: title,
        header: header
    });
});

app.get('/artcontest', (req, res) => {
    let title = 'Art Contest | Giraffe Website';
    let header = 'Art Contest';
    res.render('contest', {
        title: title,
        header: header
    });
});


app.get('/contact', (req, res) => {
    let title = 'Contact | Giraffe Website';
    let header = 'Contact Us';
    res.render('contact', {
        title: title,
        header: header
    });
});

app.get('/createaccount', (req, res) => {
    let title = 'Create an Account | Giraffe Website';
    res.render('createaccount', {
        title: title
    });
});

app.get('/login', (req, res) => {
    let title = 'Login | Giraffe Website';
    res.render('login', {
        title: title
    });
});

app.get('/basket', (req, res) => {
    let title = 'Your Basket | Giraffe Website';
    res.render('basket', {
        title: title
    });
});

app.get('/checkout', (req, res) => {
    let title = 'Checkout | Giraffe Website';
    res.render('checkout', {
        title: title
    });
});


app.get('/youraccount', (req, res) => {
    let title = 'Your Account | Giraffe Website';
    let header = 'Your Account';
    res.render('youraccount', {
        title: title,
        header: header
    });
});

app.get('/orders', (req, res) => {
    let title = 'Your Orders | Giraffe Website';
    res.render('orders', {
        title: title
    });
});

app.get(`/${searchQuery}`, (req, res) => {
    let title = 'Your Search | Giraffe Website';
    let header = 'Search Results';
    res.render('products', {
        title: title,
        header: header
    });
});

app.get('/wishlist', (req, res) => {
    let title = 'Your Wishlist | Giraffe Website';
    let header = 'Wishlist';
    res.render('wishlist', {
        title: title,
        header: header
    });
});