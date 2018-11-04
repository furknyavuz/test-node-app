// server.js

// constants
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI ||'mongodb://localhost/business-card';

// load the things we need
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

User = require('./api/models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const githubRoutes = require('./api/routes/githubRoutes');
githubRoutes(app);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
