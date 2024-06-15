import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ message: "Unauthorized - no token provided" });

        const dec = jwt.verify(token, process.env.JWT_SECRET);
        if(!dec) return res.status(401).json({ message: "Unauthorized - invalid token" });
        
        const user = await User.findById(dec.userId);
        if(!user) return res.status(404).json({ message: "User not found" });
        
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
}

export default protectRoute;