import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config();
app.use(express.json()); //to parse incoming requests with json payload
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(PORT, () => {
    console.log(`Server Connected on ${PORT}`)
});
