const User =require('../models/userModel')
const bcrypt=require('bcrypt');
const generateTokenAndSetCookie= require('../utils/generateToken.js');

exports.Signup = async (req, res) => {
  try {
    const { name, username, password, confirmPassword,gender} = req.body;
    if(password!==confirmPassword){
        return res.status(404).json({error:"Password don't match"})}


    const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"UserName Already Exists"})
        }
        // hash the password
        const hashPassword=await bcrypt.hash(password,10) 

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            name,
            username,
            password:hashPassword,
            gender,
            profilePic:gender === "male" ?boyProfilePic :girlProfilePic
        })


        if(newUser){
          generateTokenAndSetCookie(newUser._id,res);
          await newUser.save();
          res.status(201).json({
            _id:newUser.id,
            name:newUser.name,
            username:newUser.username,
            profilePic:newUser.profilePic
          })
        }
        else{
          res.status(400).json({error:"invalid user data"});
        }
  } catch (error) {
    console.log(error.message),
    res.status(500).json({
        error:"Internel server Error"
    })
  }
};

exports.Login = async (req, res) => {
  try {
    const {username,password}=req.body;
    const user=await User.findOne({username});
    const isPasswordCorrect=await bcrypt.compare(password,user.password || "");
    if(!user||!isPasswordCorrect){
      res.status(400).json({error:"Invalid Credentials"});
    }
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
      _id:user._id,
      name:user.name,
      username:user.username,
      profilePic:user.profilePic
    })
  } catch (error) {
    res.status(500).json({error:"internal srever error"})
  }
};
exports.Logout = async (req, res) => {
  try {
    res.cookie("token",null,{maxAge:0})
    res.status(200).json({message:"Logout Successfully"})
  } catch (error) {
    res.status(500).json({error:"internal srever error"})
  }
};
exports.refreshToken = async (req, res) => {
  try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
          return res.status(401).json({ error: 'Refresh token required' });
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if (!decoded) {
          return res.status(401).json({ error: 'Invalid refresh token' });
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      res.status(200).json({ accessToken });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};