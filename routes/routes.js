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
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b45a5a0846f797',
    password: 'd129f376',
    database: 'heroku_67102ae31cc4527'
});

router.get('/', (req, res) => {
    let title = 'Home | Giraffe Website';
    res.render('index', {
        title: title,
        username: req.session.username,
        loggedin: req.session.loggedin
    });
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
            data: result,
            username: req.session.username,
            loggedin: req.session.loggedin
        });
    })
});

router.get('/artcontest', (req, res) => {
    let title = 'Art Contest | Giraffe Website';
    let header = 'Art Contest';
    res.render('contest', {
        title: title,
        header: header,
        username: req.session.username,
        loggedin: req.session.loggedin
    });
});


router.get('/contact', (req, res) => {
    let title = 'Contact | Giraffe Website';
    let header = 'Contact Us';
    res.render('contact', {
        title: title,
        header: header,
        username: req.session.username,
        loggedin: req.session.loggedin
    });
});

router.get('/createaccount', ifLoggedIn, (req, res) => {
    let title = 'Create an Account | Giraffe Website';
    res.render('createaccount', {
        title: title,
        username: req.session.username,
        loggedin: req.session.loggedin,
        error: ''
    });
});

router.post('/createaccount', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordReEnter = req.body.passwordReEnter;

    db.query('SELECT * FROM customers WHERE (username = ? OR email = ?)', [username, email], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('createaccount', {
                title: 'Error | Giraffe Website',
                username: req.session.username,
                loggedin: req.session.loggedin,
                error: 'This email and/or username is already in use'
            });
        } else if (password !== passwordReEnter) {
            return res.render('createaccount', {
                title: 'Error | Giraffe Website',
                username: req.session.username,
                loggedin: req.session.loggedin,
                error: 'Passwords do not match'
            });
        }

        db.query('INSERT INTO customers SET ?', {
            username: username,
            email: email,
            password: password
        }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('createaccount', {
                    title: 'Success | Giraffe Website',
                    username: req.session.username,
                    loggedin: req.session.loggedin,
                    error: 'You have registered an account'
                });
            }
        })
    })
});

router.get('/login', ifLoggedIn, (req, res) => {
    let title = 'Login | Giraffe Website';
    res.render('login', {
        title: title,
        username: req.session.username,
        loggedin: req.session.loggedin,
        error: ''
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
                return res.render('login', {
                    title: 'Error | Giraffe Website',
                    username: req.session.username,
                    loggedin: req.session.loggedin,
                    error: 'These details do not exist'
                });
            }
        });
    } else {
        return res.render('login', {
            title: 'Error | Giraffe Website',
            username: req.session.username,
            loggedin: req.session.loggedin,
            error: 'Please enter a username and password'
        });
    }
});



router.get('/basket', (req, res) => {
    let title = 'Your Basket | Giraffe Website';

    db.query('SELECT b.productID, b.customerID, b.quantity, b.price, p.id, p.name, p.url, p.imageSrc FROM basketitems b INNER JOIN products p ON p.id = b.productID WHERE b.customerID = ?', [req.session.username], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            res.render('basket', {
                title: title,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results
            });
        } else {
            res.render('basket', {
                title: title,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: []
            });
        }
    })

});


router.get('/checkout', ifNotLoggedIn, (req, res) => {
    let title = 'Checkout | Giraffe Website';

    db.query('SELECT b.productID, b.customerID, b.quantity, b.price, p.id, p.name, p.url, p.imageSrc FROM basketitems b INNER JOIN products p ON p.id = b.productID WHERE b.customerID = ?', [req.session.username], (error, results) => {
        if (error) {
            console.log(error)
        } else if (results.length === 0) {
            res.redirect('/')
        } else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '/' + dd + '/' + mm;

            let total = 0;
            for (let i = 0; i < results.length; i++) {
                total += results[i]['price'] * results[i]['quantity'];
            }

            res.render('checkout', {
                title: title,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results,
                total: total,
                date: today
            });
        }
    })
});

router.post('/checkout', (req, res) => {
    db.query("INSERT INTO orders(customerID, orderTotal, dateOfOrder, status, paymentMethod) VALUES (?, ?, ?, ?, ?)", [req.session.username, req.body.total, req.body.date, 'Pending', 'Debit'], (err, res) => {
        if (err) {
            console.log(err)
        }
    })

    db.query('SELECT * FROM orders WHERE customerID = ? ORDER BY dateOfOrder DESC, id DESC LIMIT 1', [req.session.username], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            let id = res[0]['id'];

            db.query('SELECT * FROM basketitems WHERE customerID = ?', [req.session.username], (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    for (let i = 0; i < res.length; i++) {
                        db.query('INSERT INTO orderitems(customerID, productID, quantity, price, orderID) VALUES (?, ?, ?, ?, ?)', [req.session.username, res[i]['productID'], res[i]['quantity'], res[i]['price'], id], (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(res);
                            }
                        })
                    }

                    db.query('DELETE FROM basketitems WHERE customerID = ?', [req.session.username], (err, res) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        }
    })

    res.redirect('/');


})


router.get('/youraccount', ifNotLoggedIn, (req, res) => {
    let title = 'Your Account | Giraffe Website';
    let header = 'Your Account';
    res.render('youraccount', {
        title: title,
        header: req.session.username,
        username: req.session.username,
        loggedin: req.session.loggedin
    });
});

router.get('/orders', ifNotLoggedIn, (req, res) => {
    let title = 'Your Orders | Giraffe Website';
    let id = req.session.username;

    db.query('SELECT * FROM orders WHERE customerID = ?', [id], (error, data, fields) => {
        res.render('orders', {
            title: title,
            data: data,
            username: req.session.username,
            loggedin: req.session.loggedin
        });
    });
});

router.get('/wishlist', ifNotLoggedIn, (req, res) => {
    let title = 'Your Wishlist | Giraffe Website';
    let header = 'Wishlist';
    db.query('SELECT w.productID, w.customerID, p.id, p.name, p.url, p.imageSrc, p.price FROM wishlistitems w INNER JOIN products p ON p.id = w.productID WHERE w.customerID = ?', [req.session.username], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            res.render('wishlist', {
                title: title,
                header: header,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results
            });
        } else {
            res.render('wishlist', {
                title: title,
                header: header,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: []
            });
        }
    })
});



router.get('/logout', ifLoggedIn, (req, res) => {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('product', {
                title: results['title'],
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results
            })
        }
    })
})


router.post('/actions', (req, res) => {
    const backURL = req.header('Referer')

    if (req.body.type === 'add_to_basket') {
        db.query('SELECT * FROM basketitems WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
            if (error) {
                console.log(error);
            } else if (results.length > 0) {
                db.query('UPDATE basketitems SET quantity = quantity + 1 WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
                    if (error) throw err;
                })
            } else {
                db.query("INSERT INTO basketitems(productID, customerID, quantity, price) VALUES (?, ?, ?, ?)", [req.body.id, req.session.username, 1, req.body.price], (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    } else if (req.body.type === 'add_to_wishlist') {
        db.query('SELECT * FROM wishlistitems WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
            if (error) {
                console.log(error);
            } else if (results.length > 0) {
                return;
            } else {
                db.query("INSERT INTO wishlistitems(productID, customerID) VALUES (?, ?)", [req.body.id, req.session.username, 1, req.body.price], (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    }

    if (req.body.type === 'delete_from_wishlist') {
        db.query('SELECT * FROM wishlistitems WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                db.query('DELETE FROM wishlistitems WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
                    if (error) throw err;
                    console.log(results)
                })
            }
        })
    }
    if (req.body.type === 'delete_from_basket') {
        db.query('SELECT * FROM basketitems WHERE productID = ? AND customerID =?', [req.body.id, req.session.username], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                db.query('DELETE FROM basketitems WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
                    if (error) throw err;
                    console.log(results)
                })
            }
        })
    }

    setTimeout(() => {
        res.redirect(`${backURL}`);
    }, 300);
})


module.exports = router;