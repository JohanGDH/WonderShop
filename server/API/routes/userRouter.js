const express = require("express");
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/list', userController.listUser);
router.post("/new", userController.saveUser);

module.exports = router;
