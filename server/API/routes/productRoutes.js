const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

router.get('/test', ProductController.test);
router.get('/products', ProductController.listProducts);
router.get('/products/:name?', ProductController.getProduct);
router.post('/save', ProductController.saveProduct);
router.put('/update/:name', ProductController.updateProduct);
router.delete('/delete/:name', ProductController.deleteProduct);

module.exports = router;