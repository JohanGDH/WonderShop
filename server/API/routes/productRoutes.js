const express = require('express');
var ProductController = require('../controllers/productController')
var router = express.Router();

router.get('/test', ProductController.test);
router.get('/products', ProductController.listProducts);
router.get('/products/:name?', ProductController.getProduct);
router.post('/save', ProductController.saveProduct);
router.put('/update/:name', ProductController.updateProduct);
router.delete('/delete/:name', ProductController.deleteProduct);

module.exports = router;

