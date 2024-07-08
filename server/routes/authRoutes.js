const express=require('express')
const router=express.Router();
const {Login, Logout, Signup, refreshToken} =require('../controllers/auth.Controller')


//Auth Routes
router.route('/login').post(Login)
router.route('/logout').post(Logout)
router.route('/signup').post(Signup)
router.route('/refresh-token').post(refreshToken);

module.exports=router;