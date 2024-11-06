const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  forgetPassword,
  submitOtp,
  confirmPassword,
  googleLogin
} = require('../Controller/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgotpassword', forgetPassword);
router.post('/submitotp', submitOtp);
router.post('/confirmpassword', confirmPassword);
router.post('/google/login', googleLogin);

module.exports = router;