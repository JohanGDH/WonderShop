const express = require('express');
const shopCartController = require('../controllers/shopcartController');
const userAuth = require('../middleware/userExtractor');


const router = express.Router();

router.get('/:id', userAuth, shopCartController.getShopcart);
router.put('/:id', userAuth, shopCartController.updateShopCart);

module.exports = router;
