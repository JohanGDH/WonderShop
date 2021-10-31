const express = require("express");
const userController = require('../controllers/userController');
const userAuth = require('../middleware/userExtractor');
const roleValidator = require('../middleware/roleValidator');

const router = express.Router();

router.get('/', userController.listUser);
router.get('/:id', userController.getUser);
router.post("/", [userAuth, roleValidator.adminCheck], userController.saveUser);
router.put('/:id', [userAuth, roleValidator.adminCheck], userController.updateUser);
router.delete('/:id', [userAuth, roleValidator.adminCheck], userController.deleteUser);

module.exports = router;
