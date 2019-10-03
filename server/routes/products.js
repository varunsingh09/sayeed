const { Product } = require('./../models/product');
const { ProductImage } = require('./../models/product_image');
const express = require('express');
var fs = require('fs');


const router = express.Router();
const { upload, jwtVerifyToken } = require('./../middleware/middleware')
const { validationResult } = require('express-validator/check');

router.get('/productList', async function (req, res) {

  let product = await Product.find().sort("-_id");
  return res.status(200).send({ product: product });

});

router.post('/addProduct',jwtVerifyToken, upload.single('product'), async (req, res, next) => {
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


      //rename  and upload image
      fs.rename(file.path, file.path, async function (err) {
        if (err) {
          console.log(err);
          res.send(500);
        } else {

          res.send({
            message: 'File uploaded successfully',
            filename: req.file.filename
          });

          productimage = new ProductImage({
            filename: req.file.filename,
            product_id: productId,
            original_name: req.file.originalname,
          });

          await productimage.save();
        }
      });

    } catch (err) {
      return next(err)
    }

});




module.exports = router;
