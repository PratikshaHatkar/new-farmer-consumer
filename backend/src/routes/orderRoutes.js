import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import upload from "../middlewares/upload.js";

import {
  placeOrder,
  getFarmerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();
router.post("/" , verifyToken , authorizeRoles("admin" , "farmer" , "consumer") , placeOrder)
router.get("/order-list" , verifyToken , authorizeRoles("admin" , "farmer") , getFarmerOrders)
router.put("/:id" , verifyToken , authorizeRoles("admin" , "farmer") , updateOrderStatus)

export default router;