import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    res.send('Login route');
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
    
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser=new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePicture: "",
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const logout = async (req, res) => {
    res.send('Logout route');
}