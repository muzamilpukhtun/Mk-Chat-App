const jwt=require('jsonwebtoken')

const generateTokenAndSetCookie=(userId,res)=>{
    const token =jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"2d",
    })

    res.cookie("token",token,{
        maxAge:20 * 24 * 60 * 60 * 1000, // MS,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development",
    })
}

module.exports = generateTokenAndSetCookie;