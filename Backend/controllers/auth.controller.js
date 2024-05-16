import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generatetoken.js';
export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password doesnot match" })
        }
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "Username already exists" })
        }
        //hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilepic: gender === 'male' ? boyProfilepic : girlProfilepic
        })
        if (newUser) {
            //Generate JWT Token
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                profilepic: newUser.profilepic,
            })
        }
        else {
            res.status(400).json({ error: "Invalid UserData" })
        }
    }
    catch (error) {
        console.log("Error in signup controler", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid USername Or Password" })
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilepic: user.profilepic,
        })
    }
    catch (error) {
        console.log("Error in Login controler", error.message);
        res.status(500).json({ error: "Internal server error" })
    }

}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out succesfully" })
    }
    catch (error) {
        console.log("Error in Login controler", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}