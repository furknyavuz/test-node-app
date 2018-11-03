// server.js

// load the things we need
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
Test = require('./api/models/model');

const PORT = process.env.PORT || 3000;

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testapp', { useNewUrlParser: true });

var routes = require('./api/routes/route');
routes(app);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
