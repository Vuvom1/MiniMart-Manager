const express = require('express')
const router = express.Router();
const authController = require('../controllers/AuthController')

router.post('/signup', authController.signup_post)
router.post('/login' , authController.login_post)
router.get('/logout', authController.logout_get)
router.put('/:id/update-password', authController.updatePassword_put)


module.exports = router;


