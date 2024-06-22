const { getUserForSideBar } = require('../controllers/user.Controller');
const { protectRoute } = require('../middleware/protectRoute');
const express=require('express')
const router=express.Router();

router.route("/").get(protectRoute,getUserForSideBar)

module.exports=router;