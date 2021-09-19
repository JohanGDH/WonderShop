const express = require('express');
const ProductController = require('../controllers/productController');
const userAuth = require('../middleware/userExtractor');

const router = express.Router();

router.get('/test', ProductController.test);
router.get('/products', ProductController.listProducts);
router.get('/products/:name?', ProductController.getProduct);
router.post('/products', userAuth, ProductController.saveProduct);
router.put('/products/:name', userAuth, ProductController.updateProduct);
router.delete('/products/:name', userAuth, ProductController.deleteProduct);

module.exports = router;