const express = require('express')
const router = express.Router()

//import controllers
const {requireSignin,adminMiddleware} = require('../controller/auth')
const {read,update} = require('../controller/user')

router.get('/user/:id',requireSignin, read);
router.put('/user/update',requireSignin, update);
router.put('/admin/update',requireSignin,adminMiddleware, update);



module.exports = router