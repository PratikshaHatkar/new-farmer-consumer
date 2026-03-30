const express = require("express")
const authorizeRoles = require("../middlewares/roleMiddleware")
const verifyToken  = require("../middlewares/authMiddleware")
const Product = require("../models/productModel")
const Order = require("../models/orderModel")
const router = express.Router()
const upload = require("../middlewares/upload")
const multer = require("multer");

const {placeOrder, getFarmerOrders , updateOrderStatus,} = require("../controllers/orderController")


router.post("/" , verifyToken , authorizeRoles("admin" , "farmer" , "consumer") , placeOrder)
router.get("/order-list" , verifyToken , authorizeRoles("admin" , "farmer") , getFarmerOrders)
router.put("/:id" , verifyToken , authorizeRoles("admin" , "farmer") , updateOrderStatus)

module.exports = router;