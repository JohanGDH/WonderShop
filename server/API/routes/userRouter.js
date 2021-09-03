const express = require("express");
const userController = require('../controllers/userController');
const userExtractor = require('../middleware/userExtractor');

const router = express.Router();

router.get('/', userController.listUser);
router.get('/:id', userController.getUser);
router.post("/",userExtractor, userController.saveUser);
router.put('/:id', userExtractor, userController.updateUser);
router.delete('/:id', userExtractor, userController.deleteUser);

module.exports = router;
