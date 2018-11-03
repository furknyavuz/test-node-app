// server.js

// load the things we need
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'images')));

// index page
app.get('/', function(req, res) {
    res.render('pages/home');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
