import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";
import Product from "../models/productModel.js";
import upload from "../middlewares/upload.js";
import multer from "multer";

import {
  addProduct,
  getProductCount,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  getProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/" , verifyToken , authorizeRoles("admin" , "farmer") , getProducts,  (req,res) =>{
    res.json({message: "list"})
})
router.get("/all" , verifyToken , authorizeRoles("admin" , "consumer" , "farmer") , getAllProducts)
router.post("/addProduct" , verifyToken ,   upload.single("image") , authorizeRoles("admin" , "farmer") , addProduct,  (req,res) =>{
    res.json({message: "product added"})
})
router.get("/count" , verifyToken , authorizeRoles("admin" , "farmer") , getProductCount,  (req,res) =>{
    res.json({message: "count:"})
})
router.delete("/:id" , verifyToken , authorizeRoles("admin" , "farmer") , deleteProduct)

router.get("/product/:id" , verifyToken , authorizeRoles("admin" , "farmer") , getSingleProduct)

router.get("/productInfo/:id" , verifyToken , authorizeRoles("admin" , "consumer") , getProductDetails)

router.put("/product/:id" , verifyToken , authorizeRoles("admin" , "farmer") ,  upload.single("image"), updateProduct)

export default router;