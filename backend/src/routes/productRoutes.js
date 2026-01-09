const express = require("express")
const authorizeRoles = require("../middlewares/roleMiddleware")
const verifyToken  = require("../middlewares/authMiddleware")
const Product = require("../models/productModel")
const router = express.Router()
const upload = require("../middlewares/upload")

const {addProduct , getProductCount , getProducts , deleteProduct , updateProduct ,getSingleProduct} = require("../controllers/productController")


router.get("/" , verifyToken , authorizeRoles("admin" , "farmer") , getProducts,  (req,res) =>{
    res.json({message: "list"})
})
router.post("/addProduct" , verifyToken ,   upload.single("image") , authorizeRoles("admin" , "farmer") , addProduct,  (req,res) =>{
    res.json({message: "product added"})
})
router.get("/count" , verifyToken , authorizeRoles("admin" , "farmer") , getProductCount,  (req,res) =>{
    res.json({message: "count:"})
})
router.delete("/:id" , verifyToken , authorizeRoles("admin" , "farmer") , deleteProduct)
// router.get("/:id" , verifyToken , authorizeRoles("admin" , "farmer") , getSingleProduct)
router.put("/:id" , verifyToken , authorizeRoles("admin" , "farmer") , updateProduct)



//get product
// router.get("/" , verifyToken , authorizeRoles("admin" , "farmer"), async(req , res) =>{
//     try{
//         const product = await Product.find({farmerId:req.user.id})
//     res.json({message:"products list" , product})
//     }
//     catch(error){
//         res.json({message:error.message})
//     }
// })
// router.get("/count" , verifyToken , authorizeRoles("admin" , "farmer"), async(req , res) =>{
//     try{
//         let count ;
//         if(req.user.role === "admin"){
//             count = await Product.countDocuments()

//         }
//         else{
//             count = await Product.countDocuments({farmerId:req.user.id})
//         }
        
//     res.status(200).json({count})
//     }
//     catch(error){
//         res.status(500).json({message:error.message})
//     }
// })


  

// router.post("/" ,  verifyToken  , authorizeRoles("admin" , "farmer"),async (req ,res) => {
//     try{
//     const {name , price , quantity ,image } = req.body;

//     const product = new Product({
//         name , 
//         price , 
//         quantity ,
//         image,
//         farmerId:req.user.id,
//     })

//     await product.save()

//     res.status(201).json({message:"product added successfully" , product})
       
// }catch(error){
//     res.status(500).json({message:error.message})

// }
// })

 module.exports = router;