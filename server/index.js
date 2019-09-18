var express = require("express");
var bodyParser = require("body-parser");
var morgan = require('morgan')

const dbConfig = require('./db')
//const jwt= require("./middleware/jwt")
const users = require('./routes/users');

const port = process.env.PORT || 3002;
var app = express();
dbConfig();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
//app.use(jwt)
//app.use('/api/users',jwt, users);

app.use('/api/users',users);


app.listen(port, () => console.log(`Listening on port ${port}...`));