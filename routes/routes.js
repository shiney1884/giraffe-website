const express = require('express');
const mySQL = require('mysql');
const router = express.Router();
const bodyparser = require('body-parser')
const session = require('express-session')

const ifLoggedIn = (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('/');
    }
    next();
}

const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    next();
}

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyparser.urlencoded({
    extended: true
}));
router.use(bodyparser.json());

const db = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'giraffe-data'
});

router.get('/', (req, res) => {
    let title = 'Home | Giraffe Website';
    res.render('index', {
        title: title
    });
    console.log(req.session);
})

router.get('/pens', (req, res) => {
    let title = 'Pens | Giraffe Website';
    let header = 'Pens';
    let sql = 'SELECT * FROM products';

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('products', {
            title: title,
            header: header,
            data: result
        });
    })
});

router.get('/artcontest', (req, res) => {
    let title = 'Art Contest | Giraffe Website';
    let header = 'Art Contest';
    res.render('contest', {
        title: title,
        header: header
    });
});


router.get('/contact', (req, res) => {
    let title = 'Contact | Giraffe Website';
    let header = 'Contact Us';
    res.render('contact', {
        title: title,
        header: header
    });
});

router.get('/createaccount', ifLoggedIn, (req, res) => {
    let title = 'Create an Account | Giraffe Website';
    res.render('createaccount', {
        title: title
    });
});

router.get('/login', ifLoggedIn, (req, res) => {
    let title = 'Login | Giraffe Website';
    res.render('login', {
        title: title
    });
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        db.query('SELECT * FROM customers WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                res.send('Error');
            }
            res.end()
        });
    } else {
        res.send('Please enter username and password');
        res.end();
    }
});



router.get('/basket', (req, res) => {
    let title = 'Your Basket | Giraffe Website';
    res.render('basket', {
        title: title
    });
});

router.get('/checkout', (req, res) => {
    let title = 'Checkout | Giraffe Website';
    res.render('checkout', {
        title: title
    });
});


router.get('/youraccount', ifNotLoggedIn, (req, res) => {
    let title = 'Your Account | Giraffe Website';
    let header = 'Your Account';
    res.render('youraccount', {
        title: title,
        header: header
    });
});

router.get('/orders', ifNotLoggedIn, (req, res) => {
    let title = 'Your Orders | Giraffe Website';
    let id = req.session.username;

    db.query('SELECT * FROM orders WHERE customerID = ?', [id], (error, data, fields) => {
        res.render('orders', {
            title: title,
            data: data
        });
    });
});

router.get('/wishlist', ifNotLoggedIn, (req, res) => {
    let title = 'Your Wishlist | Giraffe Website';
    let header = 'Wishlist';
    res.render('wishlist', {
        title: title,
        header: header
    });
});

router.get('/logout', ifLoggedIn, (req, res) => {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;