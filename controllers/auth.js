const mySQL = require('mysql');

    const db = mySQL.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'giraffe-data'
    });

    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('mysql connected');
    });

exports.logIn = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username && password) {
        db.query('SELECT * FROM customers WHERE username = ? AND password = ?', [username, password], (error, results, fields)=> {
            if(results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                res.send('Incorrect username and/or password');
            }
            res.end()
        });
    } else {
        res.send('Please enter username and password');
        res.end();
    }
}