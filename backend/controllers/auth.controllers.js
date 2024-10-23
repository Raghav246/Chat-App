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



const loginUser =async (req, res) => {
    try{
    const{username,password}=req.body;
    const user=await User.findOne({username});
    const isPasswordCorrect=await bcrypt.compare(password,user.password || "");
    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:'Invalid Credentials'})
    }
    generateTokenAndSetCookie(user?._id,res);
    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        password: newUser.password,
        profilePic: newUser.profilePic
    })
   }
    catch(e){
     res.status(500).json({error:"Internal Server ERROR"})
    }
}
const userLogout = (req, res) => {
    try{
      res.cookie("jwt","",{maxAge:0})
    }
    catch(e){
    return res.status(500).json({error:'Internal Server Error'})
    }
}
export { signUpUser, loginUser, userLogout }