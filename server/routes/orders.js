const { Order } = require('./../models/order');
const { Admin } = require('./../models/admin');
const { Product } = require('./../models/product');
const express = require('express');
const router = express.Router();


router.post('/createOrder',async function (req, res, next) {    

    let adminStatus= true
    let productStatus= true
    
    let admin = await Admin.findOne({ email: req.body.email });

    let product = await Product.findOne({ _id: req.body.product_id });
    
    if (!admin) {
        adminStatus = true;
        return res.status(400).json({ errors: 'That admin done not exist,please check' });

    }
    
    if (!product) {
        productStatus = true;
        return res.status(400).json({ errors: 'That product is not availabel.' });

    }
 
    if(adminStatus===true && productStatus===true){
    try {
        order = new Order({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            });

        await order.save();
        
        return res.status(200).send({ response: order });

    } catch (err) {
        return next(err)
    }
    }

});





module.exports = router;
