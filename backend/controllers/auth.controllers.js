const signUpUser=(req,res)=>{
      res.send("signUpUser")
   console.log("user registered")
}
const loginUser=(req,res)=>{
    res.send("LoginUser")
  console.log("user looged in")
}
const userLogout=(req,res)=>{
    res.send("LogoutUser")
    console.log("user looged out")
}
export {signUpUser,loginUser, userLogout}