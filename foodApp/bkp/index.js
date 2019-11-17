var express = require("express");
var bodyParser = require("body-parser");
var morgan = require('morgan')
var cors = require('cors');
const session = require('express-session')


const dbConfig = require('./db')
//const jwt= require("./middleware/jwt")

const admins = require('./routes/admins');


const port = process.env.PORT || 8800;
var app = express();
app.use(cors({
    origin: '*'
}));
dbConfig();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(morgan('dev'))

//session secret key
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));





//app.use(jwt)
//app.use('/api/users',jwt, users);

app.use('/api/admins', admins);

// this code is to display error if anyone typed wrongURL extenstion 

// app.use(function (req, res, next) {
//     var err = new Error('We think you are lost, you might typed wrong URL!');
//     err.status = 404;
//     return next(err);
// });





app.listen(port, () => console.log(`Listening on port ${port}...`));