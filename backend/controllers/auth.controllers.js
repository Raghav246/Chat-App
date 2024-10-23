import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

const signUpUser = async (req, res) => {
    try {
        const { name, username, password, confirmPassword, gender, profilePic } = req.body;
        if (password != confirmPassword)
            return res.status(400).json({ error: "Password Don't Match" })

        const user = await user.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User Already Exist" })
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            //generate JWT tOKEN HERE
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                password: newUser.password,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ error: "Invalid User Data" })
        }
    }
    catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}



const loginUser = (req, res) => {
    res.send("LoginUser")
    console.log("user looged in")
}
const userLogout = (req, res) => {
    res.send("LogoutUser")
    console.log("user looged out")
}
export { signUpUser, loginUser, userLogout }