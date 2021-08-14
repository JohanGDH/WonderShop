const express = require('express');
var ProductController = require('../controllers/productController')
var router = express.Router();

router.get('/test', ProductController.test);

module.exports = router;

