const express = require('express');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT;

if (port == null || port == '') {
    port = 3000;
}

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use('/', require('./routes/routes'));

app.listen(port, () => {
    console.log('server started');
});