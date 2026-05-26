import express from "express";
import payment from "./routes/paymentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// existing route
app.use("/api/v1", payment);

// NEW payment route
app.use("/api/payment", paymentRoutes);

export default app;