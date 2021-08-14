const express = require('express');
var ProductController = require('../controllers/productController')
var router = express.Router();

router.get('/test', ProductController.test);
router.get('/products', ProductController.listProducts)

module.exports = router;

