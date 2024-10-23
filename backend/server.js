import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
dotenv.config();
const app=express();
const PORT=process.env.PORT||9000;
app.use("/api/auth",authRoutes)
app.listen(PORT,()=>console.log(`Server Connected on ${PORT}`))
