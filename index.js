const express = require('express');
const mySQL = require('mysql');
const ejs = require('ejs');
const app = express();
let clickedProduct = 'Pencil3';
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
    let title = `${clickedProduct} | Giraffe Website`;
    let header = `${clickedProduct}`;
    res.render('products', {title: title, header: header});
});

app.get('/pens', (req, res)=> {
    let title = 'Pens | Giraffe Website';
    let header = 'Pens';
    res.render('products', {title: title, header: header});
});

app.get('/artcontest', (req, res)=> {
    let title = 'Art Contest | Giraffe Website';
    let header = 'Art Contest';
    res.render('contest', {title: title, header: header});
});


app.get('/contactus', (req, res)=> {
    let title = 'Contact Us | Giraffe Website';
    let header = 'Contact Us';
    res.render('contact', {title: title, header: header});
});

