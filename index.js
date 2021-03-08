const express = require('express');
const mySQL = require('mysql');
const ejs = require('ejs');
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(3000, ()=> {
    console.log('server started on port 3000');
});

app.get('/', (req, res)=> {
    res.render('index');
})

app.get('/contact', (req, res)=> {
    res.render('contact');
})