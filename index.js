const express = require('express');//enabling express
const ejs = require('ejs'); //enabling ejs
const app = express(); //app startup
let port = process.env.PORT; //setting port

//port setup functionality
if (port == null || port == '') {
    port = 3000;
}

//allows index.js to access static files in the public folder
app.use(express.static("public"));

//sets view engine to ejs
app.set('view engine', 'ejs');


//tells index.js to acccess this file to find routes
app.use('/', require('./routes/routes'));


//sets up port for server to find site
app.listen(port, () => {
    console.log('server started');
});