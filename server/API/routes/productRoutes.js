const express = require('express');
const ProductController = require('../controllers/productController');
const userExtractor = require('../middleware/userExtractor');

const router = express.Router();

router.get('/test', ProductController.test);
router.get('/products', ProductController.listProducts);
router.get('/products/:name?', ProductController.getProduct);
router.post('/products', userExtractor, ProductController.saveProduct);
router.put('/products/:name', userExtractor, ProductController.updateProduct);
router.delete('/products/:name', userExtractor, ProductController.deleteProduct);

module.exports = router;