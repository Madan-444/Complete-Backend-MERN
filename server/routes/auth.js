const express = require('express')
const router = express.Router()

//import controllers

const {signup} = require('../controller/auth')
const {signin, requireSignin,forgotPassword,resetPassword} = require('../controller/auth')
const {accountActivation} = require('../controller/auth')
//import validators
const {userSignupValidator,forgotPasswordValidator,resetPasswordValidator} = require('../validators/auth')
const {userSigninValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// router.get('/signup', signup);
router.post('/signup',userSignupValidator,runValidation, signup);
router.post('/account-activation',accountActivation);
router.post('/signin',userSigninValidator,runValidation, signin)

// forgot and reset password
router.put('/forgot-password',forgotPasswordValidator,runValidation, forgotPassword)
router.put('/reset-password',resetPasswordValidator,runValidation, resetPassword)


module.exports = router