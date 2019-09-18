var express = require("express");
var bodyParser = require("body-parser");
var morgan = require('morgan')
const dbConfig = require('./db')
const users = require('./routes/users');
const port = process.env.PORT || 3002;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

dbConfig();


app.use(morgan('dev'))
app.use('/api/users', users);

app.listen(port, () => console.log(`Listening on port ${port}...`));