const express = require('express');
const mySQL = require('mysql');
const ejs = require('ejs');
const app = express();
let clickedProduct = 'pencil3';
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(3000, ()=> {
    console.log('server started on port 3000');
});

app.get('/', (req, res)=> {
    let title = 'Home | Giraffe Website';
    res.render('index', {title: title});
})

app.get(`/${clickedProduct}`, (req, res)=> {
    let title = 'Pencils | Giraffe Website';
    let header = 'Pencils';
    res.render('products', {title: title, header: header});
});

app.get('/pens', (req, res)=> {
    let title = 'Pens | Giraffe Website';
    let header = 'Pens';
    res.render('products', {title: title, header: header});
});