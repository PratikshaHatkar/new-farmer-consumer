const express = require("express")
const authorizeRoles = require("../middlewares/roleMiddleware")
const verifyToken  = require("../middlewares/authMiddleware")
const Product = require("../models/productModel")
const router = express.Router()
const upload = require("../middlewares/upload")

const {addProduct , getProductCount , getProducts , deleteProduct , updateProduct ,getSingleProduct ,
    getAllProducts} = require("../controllers/productController")


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
router.put("/product/:id" , verifyToken , authorizeRoles("admin" , "farmer") ,  upload.single("image"), updateProduct)




 module.exports = router;