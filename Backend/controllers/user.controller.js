import User from "../models/user.model.js";

export const getUserForSidebar=async(req,res)=>{
    try{
        const loggedInUserId =req.user ? req.user._id : null;

        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    }
    catch (error) {
        console.log("Error in getUserForSidebar controller", error.stack);
        res.status(500).json({ error: "Internal server error" })
    }
}