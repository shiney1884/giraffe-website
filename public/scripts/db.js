exports.db = () => {
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
}