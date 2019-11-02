const { Product } = require('./../models/product');
const { ProductImage } = require('./../models/product_image');
const uuidv4 = require('uuid/v4');
const express = require('express');
var fs = require('fs');


const router = express.Router();
const { upload, jwtVerifyToken } = require('./../middleware/middleware')
const { redisSetKey, client } = require('./../middleware/redis')
const { validationResult } = require('express-validator');


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

  await redisSetKey('product_list_new', product)

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






// This route is to fetch data from productschema ,it will show counts and find duplicate 
//code to test redis route 
router.get('/productlistfromcache', async function (req, res) {

  client.get('product_list', async function (error, product) {
    if (error) {
      console.log(error)

      let product = await ProductSchema.find(
        { created_by: req.body.created_by },
        { price: 1, title: 1, created_by: 1 }).
        lean(true).skip(1).limit(3);
      await redisSetKey('product_list', product)

      return res.status(200).send({ 'type': 'mongo', product: JSON.parse(product) })

    }

    if (product) {
      //res.json(JSON.parse(product));
      return res.status(200).send({ 'type': 'cache', product: JSON.parse(product) })

    }


  });


})







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

  router.get('/productListFromCache', function (req, res, next) {

    // getting data from cache
    client.get('product_list_new', async function (error, product) {
      if (error) {
        console.log(error)

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

        return res.status(200).send({ 'type': 'mongo', product: JSON.parse(product) })

      }
      if (product) {
        //res.json(JSON.parse(product));

        return res.status(200).send({ 'type': 'cache', product: JSON.parse(product) })

      }

    })

  });


  module.exports = router;