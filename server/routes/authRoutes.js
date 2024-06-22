const express=require('express')
const router=express.Router();
const {Login, Logout, Signup} =require('../controllers/auth.Controller')


//Auth Routes
router.route('/login').post(Login)
router.route('/logout').post(Logout)
router.route('/signup').post(Signup)

module.exports=router;