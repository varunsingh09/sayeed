const { Product } = require('./../models/product');
const { ProductImage } = require('./../models/product_image');
const uuidv4 = require('uuid/v4');
const express = require('express');
var fs = require('fs');


const router = express.Router();
const { upload, jwtVerifyToken } = require('./../middleware/middleware')
const { validationResult } = require('express-validator/check');

router.get('/productList', async function (req, res) {
  console.log("product session information===", req.session.email)
  let product = await Product.aggregate
    ([

      {
        $lookup:
        {
          from: 'users',
          localField: 'email',
          foreignField: 'email',
          as: 'userArray',


        }

      },

      {
        "$project": {

          "title": "$$ROOT.title",
          "price": "$$ROOT.price",
          "category": "$$ROOT.category",
          userArray: {
            "name": "$userArray.name",
            "email": "$userArray.email",
            "zipcode": "$userArray.zipcode",
          }
        }
      },
      
      {
        "$unwind": {
          "path": "$project",
          "preserveNullAndEmptyArrays": true
        }
      },
      

    ])
  console.log("=========", product)

  return res.status(200).send({ product: product });

});

router.post('/addProduct'/*,jwtVerifyToken*/, upload.single('product'), async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    // Insert the new product

    product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });

    await product.save();


    let productId = product._id
    const file = req.file

    if (!file) {
      res.status(400).json({
        "status": "failed",
        "code": "400",
        "message": "Please upload file"
      });
    }


    res.status(200).json({
      "status": "success",
      "code": "200",
      "message": "file uploaded successfully",
      "data": file
    });

    productimage = new ProductImage({
      filename: req.file,
      product_id: productId,
    });

    await productimage.save();

  } catch (err) {
    return next(err)
  }

});


router.post('/addProductWithMultiImages', upload.array('products', 3), async (req, res, next) => {


  try {

    const files = req.files;
    if (!files) {
      res.status(400).json({
        "status": "failed",
        "code": "400",
        "message": "Please upload file"
      });
    }


    res.status(200).json({
      "status": "success",
      "code": "200",
      "message": "file uploaded successfully",
      "data": files
    });
    console.log("----------", req.session.email)
    product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      email: 'sayed.usa@gmail.com',
      category: req.body.category,
    });

    await product.save();
    let u_id = uuidv4();
    productimage = new ProductImage({
      filename: files,
      product_id: product._id,
      u_id: u_id
    });


    await productimage.save();

    res.status(200).send({
      product: product
    });

  } catch (err) {
    return next(err)
  }


});

module.exports = router;