const jwt=require('jsonwebtoken')

const generateTokenAndSetCookie=(userId,res)=>{
    const token =jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"2d",
    })

    res.cookie("token",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
    })
}

module.exports = generateTokenAndSetCookie;