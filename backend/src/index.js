import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dbConnect()


const app = express()
//middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, ".." , "uploads")));



//routes
app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/farmer" , productRoutes)
app.use("/api/consumer" , productRoutes)
app.use("/api/orders" , orderRoutes)
// app.use("/api/my-product" , productRoutes)
// app.use("/api/count" , productRoutes)



//start
const PORT = process.env.PORT || 5002;
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
})
