import { loginUser, signUpUser, userLogout } from "../controllers/auth.controllers.js";
import express from "express"
const router=express.Router();
router.get("/signup",signUpUser)
router.get("/login",loginUser)
router.get("/logout",userLogout)

export default router;