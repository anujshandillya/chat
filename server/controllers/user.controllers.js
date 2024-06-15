import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({
            message: "Users fetched successfully",
            data: filteredUsers
        });

    } catch (error) {
        console.log("Error in get user for sidebar controller: ", error)
        res.status(500).json({ message: "Internal server error" });
    }
}