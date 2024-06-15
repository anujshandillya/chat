import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genTokenAndSetCookie from "../utils/genToken.js";

export const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await User.findOne({username});
        const isMatch = await bcrypt.compare(password, user?.password || "");
        if(!user || !isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        genTokenAndSetCookie(user._id, res);

        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            fullName: `${user.firstName} ${user.lastName}`,
            username: user.username,
        });
    } catch (error) {
        console.log("Error in auth login controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;
    
        if(password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }
    
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const male=`https://avatars.iran.liara.run/public/boy?username=${username}`
        const female=`https://avatars.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePicture: gender==="male"?male:female
        });

        if(newUser) {
            // JWT
            genTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                message: "User registered successfully",
                _id: newUser._id,
                fullName: `${newUser.firstName} ${newUser.lastName}`,
                username: newUser.username,
            });
        }else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in auth register controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","",{
            maxAge: 0
        })
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log("Error in auth logout controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}