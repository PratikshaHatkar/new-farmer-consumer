const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");
const productRoutes = require("./routes/productRoutes")

const path = require("path")

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
// app.use("/api/my-product" , productRoutes)
// app.use("/api/count" , productRoutes)

 
//start
const PORT = process.env.PORT || 5002;
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
})
