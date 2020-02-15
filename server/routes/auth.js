const express = require('express')
const router = express.Router()

//import controllers

const {signup} = require('../controller/auth')
const {signin} = require('../controller/auth')
const {accountActivation} = require('../controller/auth')
//import validators
const {userSignupValidator} = require('../validators/auth')
const {userSigninValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

// router.get('/signup', signup);
router.post('/signup',userSignupValidator,runValidation, signup);
router.post('/account-activation',accountActivation);
router.post('/signin',userSigninValidator,runValidation, signin)


module.exports = router