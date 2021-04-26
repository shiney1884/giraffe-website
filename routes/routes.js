const express = require('express');
const dotenv = require('dotenv').config();
const mySQL = require('mysql2');
const router = express.Router();
const bodyparser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const auth = {
    auth: {
        api_key: process.env.SANDBOX_API_KEY,
        domain: process.env.SANDBOX_DOMAIN
    }
};
const transporter = nodemailer.createTransport(mailGun(auth));

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(flash());

router.use(bodyparser.urlencoded({
    extended: true
}));
router.use(bodyparser.json());

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


const db = mySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});


function getBasketItems(req, res) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM basketitems WHERE customerID = ?', [req.session.username], (err, res) => {
            if (err) {
                reject(err)
            } else {
                var amount = res.length
                resolve(amount)
            }
        })
    })
}




router.get('/', async (req, res) => {
    let title = 'Home | Giraffe Website';
    let basketAmount = await getBasketItems(req, res);

    res.render('index', {
        title: title,
        username: req.session.username,
        loggedin: req.session.loggedin,
        basketAmount: basketAmount
    });
})

router.get('/pens', async (req, res) => {
    let title = 'Pens | Giraffe Website';
    let header = 'Pens';
    let sql = 'SELECT * FROM products WHERE categoryID = 1';
    let basketAmount = await getBasketItems(req, res);

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.render('products', {
            title: title,
            header: header,
            data: result,
            username: req.session.username,
            loggedin: req.session.loggedin,
            basketAmount: basketAmount
        });
    })
});

router.get('/pencils', async (req, res) => {
    let title = 'Pencils | Giraffe Website';
    let header = 'Pencils';
    let sql = 'SELECT * FROM products WHERE categoryID = 2';
    let basketAmount = await getBasketItems(req, res);

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.render('products', {
            title: title,
            header: header,
            data: result,
            username: req.session.username,
            loggedin: req.session.loggedin,
            basketAmount: basketAmount
        });
    })
});

router.get('/notebooks', async (req, res) => {
    let title = 'Notebooks | Giraffe Website';
    let header = 'Notebooks';
    let sql = 'SELECT * FROM products WHERE categoryID = 3';
    let basketAmount = await getBasketItems(req, res);

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.render('products', {
            title: title,
            header: header,
            data: result,
            username: req.session.username,
            loggedin: req.session.loggedin,
            basketAmount: basketAmount
        });
    })
});

router.get('/artcontest', async (req, res) => {
    let title = 'Art Contest | Giraffe Website';
    let header = 'Art Contest';
    let basketAmount = await getBasketItems(req, res);

    db.query('SELECT * FROM artcontestwinners', (error, results) => {
        if (error) {
            console.log(error);
        }
        res.render('contest', {
            title: title,
            header: header,
            username: req.session.username,
            loggedin: req.session.loggedin,
            basketAmount: basketAmount,
            winners: results
        });

    })

});


router.get('/contact', async (req, res) => {
    let title = 'Contact | Giraffe Website';
    let header = 'Contact Us';
    let basketAmount = await getBasketItems(req, res);
    res.render('contact', {
        title: title,
        header: header,
        username: req.session.username,
        loggedin: req.session.loggedin,
        basketAmount: basketAmount
    });
});

router.get('/createaccount', ifLoggedIn, async (req, res) => {
    let title = 'Create an Account | Giraffe Website';
    let basketAmount = await getBasketItems(req, res);

    res.render('createaccount', {
        title: title,
        username: req.session.username,
        loggedin: req.session.loggedin,
        message: req.flash('message'),
        basketAmount: basketAmount
    });
});

router.post('/createaccount', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordReEnter = req.body.passwordReEnter;
    let basketAmount = await getBasketItems(req, res);


    if (!email) {
        req.flash('message', 'Please enter an email');
        return res.render('createaccount', {
            title: 'Error | Giraffe Website',
            username: req.session.username,
            loggedin: req.session.loggedin,
            message: req.flash('message'),
            basketAmount: basketAmount
        });
    }

    if (!username) {
        req.flash('message', 'Please enter a username');
        return res.render('createaccount', {
            title: 'Error | Giraffe Website',
            username: req.session.username,
            loggedin: req.session.loggedin,
            message: req.flash('message'),
            basketAmount: basketAmount
        });
    }

    if (!password) {
        req.flash('message', 'Please enter a password');
        return res.render('createaccount', {
            title: 'Error | Giraffe Website',
            username: req.session.username,
            loggedin: req.session.loggedin,
            message: req.flash('message'),
            basketAmount: basketAmount
        });
    }
    if (!passwordReEnter) {
        req.flash('message', 'Please re-enter your password');
        return res.render('createaccount', {
            title: 'Error | Giraffe Website',
            username: req.session.username,
            loggedin: req.session.loggedin,
            message: req.flash('message'),
            basketAmount: basketAmount
        });
    }

    db.query('SELECT * FROM customers WHERE (username = ? OR email = ?)', [username, email], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            req.flash('message', 'Email and/or username is already in use');
            return res.render('createaccount', {
                title: 'Error | Giraffe Website',
                username: req.session.username,
                loggedin: req.session.loggedin,
                message: req.flash('message'),
                basketAmount: basketAmount
            });
        } else if (password !== passwordReEnter) {
            req.flash('message', 'Passwords do not match')
            return res.render('createaccount', {
                title: 'Error | Giraffe Website',
                username: req.session.username,
                loggedin: req.session.loggedin,
                message: req.flash('message'),
                basketAmount: basketAmount
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
                req.flash('message', 'You have successfully created your account')
                return res.render('login', {
                    title: 'Success | Giraffe Website',
                    username: req.session.username,
                    loggedin: req.session.loggedin,
                    message: req.flash('message'),
                    basketAmount: basketAmount
                });
            }
        })
    })
});

router.get('/login', ifLoggedIn, async (req, res) => {
    let title = 'Login | Giraffe Website';
    let basketAmount = await getBasketItems(req, res);

    res.render('login', {
        title: title,
        username: req.session.username,
        loggedin: req.session.loggedin,
        message: req.flash('message'),
        basketAmount: basketAmount
    });
});

router.post('/contact', async (req, res) => {
    let email = req.body.email;
    let details = req.body.details;
    const mailOptions = {
        sender: 'user',
        from: email,
        to: 'scott04067@outlook.com',
        subject: 'Problem',
        text: details
    };

    transporter.sendMail(mailOptions, function await (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });

    res.redirect('/contact');
})


router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let basketAmount = await getBasketItems(req, res);

    if (username && password) {
        db.query('SELECT * FROM customers WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                req.flash('message', 'Incorrect Login Details')
                return res.render('login', {
                    title: 'Error | Giraffe Website',
                    username: req.session.username,
                    loggedin: req.session.loggedin,
                    message: req.flash('message'),
                    basketAmount: basketAmount
                });
            }
        });
    } else {
        req.flash('message', 'Please enter a username and password')
        return res.render('login', {
            title: 'Error | Giraffe Website',
            username: req.session.username,
            loggedin: req.session.loggedin,
            message: req.flash('message'),
            basketAmount: basketAmount
        });
    }
});



router.get('/basket', async (req, res) => {
    let title = 'Your Basket | Giraffe Website';
    let basketAmount = await getBasketItems(req, res);

    db.query('SELECT b.productID, b.customerID, b.quantity, b.price, p.id, p.name, p.url, p.imageSrc FROM basketitems b INNER JOIN products p ON p.id = b.productID WHERE b.customerID = ?', [req.session.username], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            res.render('basket', {
                title: title,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results,
                basketAmount: basketAmount
            });
        } else {
            res.render('basket', {
                title: title,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: [],
                basketAmount: basketAmount
            });
        }
    })

});


router.get('/checkout', ifNotLoggedIn, async (req, res) => {
    let title = 'Checkout | Giraffe Website';
    let basketAmount = await getBasketItems(req, res);

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

            today = yyyy + '/' + mm + '/' + dd;

            let total = 0;
            for (let i = 0; i < results.length; i++) {
                total += results[i]['price'] * results[i]['quantity'];
            }

            res.render('checkout', {
                title: title,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results,
                total: total.toFixed(2),
                date: today,
                basketAmount: basketAmount
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

    setTimeout(() => {
        res.redirect('/');
    }, 500);


})

router.get('/search', (req, res) => {
    res.redirect('/');
})


router.get('/youraccount', ifNotLoggedIn, async (req, res) => {
    let title = 'Your Account | Giraffe Website';
    let header = 'Your Account';
    let basketAmount = await getBasketItems(req, res);

    res.render('youraccount', {
        title: title,
        header: req.session.username,
        username: req.session.username,
        loggedin: req.session.loggedin,
        basketAmount: basketAmount
    });
});

router.get('/orders', ifNotLoggedIn, async (req, res) => {
    let title = 'Your Orders | Giraffe Website';
    let id = req.session.username;
    let basketAmount = await getBasketItems(req, res);

    db.query('SELECT * FROM orders WHERE customerID = ?', [id], (error, data, fields) => {
        res.render('orders', {
            title: title,
            data: data,
            username: req.session.username,
            loggedin: req.session.loggedin,
            basketAmount: basketAmount
        });
    });
});

router.get('/wishlist', ifNotLoggedIn, async (req, res) => {
    let title = 'Your Wishlist | Giraffe Website';
    let header = 'Wishlist';
    let basketAmount = await getBasketItems(req, res);

    db.query('SELECT w.productID, w.customerID, p.id, p.name, p.url, p.imageSrc, p.price FROM wishlistitems w INNER JOIN products p ON p.id = w.productID WHERE w.customerID = ?', [req.session.username], (error, results) => {
        if (error) {
            console.log(error);
        } else if (results.length > 0) {
            res.render('wishlist', {
                title: title,
                header: header,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results,
                basketAmount: basketAmount
            });
        } else {
            res.render('wishlist', {
                title: title,
                header: header,
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: [],
                basketAmount: basketAmount
            });
        }
    })
});



router.get('/logout', ifLoggedIn, (req, res) => {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});

router.get('/:id', async (req, res) => {
    let basketAmount = await getBasketItems(req, res);
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('product', {
                title: results['title'],
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results,
                basketAmount: basketAmount
            })
        }
    })
})


router.post('/actions', async (req, res) => {
    const backURL = req.header('Referer')
    let basketAmount = await getBasketItems(req, res);

    if (req.session.loggedin) {
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
                } else if (results[0].quantity > 1) {
                    db.query('UPDATE basketitems SET quantity = quantity - 1 WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
                        if (error) throw err;
                    })
                } else {
                    db.query('DELETE FROM basketitems WHERE productID = ? AND customerID = ?', [req.body.id, req.session.username], (error, results) => {
                        if (error) throw err;
                        console.log(results)
                    })
                }
            })
        }

        setTimeout(() => {
            res.redirect(`${backURL}` || '/');
        }, 300);

    } else {
        if (req.body.type === 'add_to_basket') {
            req.flash('message', 'Please create an account to add items to your basket')
            return res.render('createaccount', {
                title: 'Error | Giraffe Website',
                username: req.session.username,
                loggedin: req.session.loggedin,
                message: req.flash('message'),
                basketAmount: basketAmount
            });
        }

        if (req.body.type === 'add_to_wishlist') {
            req.flash('message', 'Please create an account to add items to your wishlist')
            return res.render('createaccount', {
                title: 'Error | Giraffe Website',
                username: req.session.username,
                loggedin: req.session.loggedin,
                message: req.flash('message'),
                basketAmount: basketAmount
            });
        }
    }



})



router.post('/search', async (req, res) => {
    let query = `%${req.body.query}%`;
    let basketAmount = await getBasketItems(req, res);

    db.query('SELECT * FROM products WHERE name LIKE ?', [query], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.render('products', {
                title: 'Search Results',
                header: 'Search Results',
                username: req.session.username,
                loggedin: req.session.loggedin,
                data: results,
                basketAmount: basketAmount
            });
        }
    })
})


module.exports = router;