import express from "express";
// import payment from "./routes/paymentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from 'cors'

const app = express();

// middleware
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));

// existing route
// app.use("/api/v1", payment);

// NEW payment route
app.use("/api/v1", paymentRoutes);

export default app;