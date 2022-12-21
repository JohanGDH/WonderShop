const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', loginController.login);
router.post('/recovery', loginController.sendRecoveryEmail);
router.put('/change-password', loginController.changePassword);

module.exports = router;


