
const jwt = require('jsonwebtoken')

var config = require('./../config');

const jwtToken=function (req,res,next){
    //console.log('come inside verify token' , req)
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            return next();
        });
    
}

module.exports = jwtToken
