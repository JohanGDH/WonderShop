const express = require('express');
const ProductController = require('../controllers/productController');
const userAuth = require('../middleware/userExtractor');
const multerMiddleware = require('../middleware/imageMulter');

const router = express.Router();

router.get('/test', ProductController.test);
router.get('/products', ProductController.listProducts);
router.get('/products/:name?', ProductController.getProduct);
router.post('/products', userAuth, ProductController.saveProduct);
router.post('/upload/:id', multerMiddleware, ProductController.uploadImg);
router.put('/products/:name', ProductController.updateProduct);
router.delete('/products/:name', userAuth, ProductController.deleteProduct);

module.exports = router;