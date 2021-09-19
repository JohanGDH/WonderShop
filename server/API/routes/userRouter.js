const express = require("express");
const userController = require('../controllers/userController');
const userAuth = require('../middleware/userExtractor');

const router = express.Router();

router.get('/', userController.listUser);
router.get('/:id', userController.getUser);
router.post("/",userAuth, userController.saveUser);
router.put('/:id', userAuth, userController.updateUser);
router.delete('/:id', userAuth, userController.deleteUser);

module.exports = router;
