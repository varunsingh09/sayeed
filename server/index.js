var express = require("express");
var bodyParser = require("body-parser");
var morgan = require('morgan')
var cors = require('cors');

const dbConfig = require('./db')
//const jwt= require("./middleware/jwt")
const users = require('./routes/users');
const products = require('./routes/products');


const port = process.env.PORT || 3005;
var app = express();
app.use(cors({origin: '*'}));
dbConfig();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

//app.use(jwt)
//app.use('/api/users',jwt, users);

app.use('/api/users',users);
app.use('/api/products',products);


app.listen(port, () => console.log(`Listening on port ${port}...`));