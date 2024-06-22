const express=require('express')
const router=express.Router();

const {sendMessage, getMessage} =require('../controllers/message.Controller');
const { protectRoute } = require('../middleware/protectRoute');

router.route('/:id').get(protectRoute,getMessage);
router.route('/send/:id').post(protectRoute,sendMessage);

module.exports=router;