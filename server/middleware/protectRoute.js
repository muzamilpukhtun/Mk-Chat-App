const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure the cookie name matches how it's set
        if (!token) {
            return res.status(401).json({ error: "Unauthorized Access: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized Access: Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
