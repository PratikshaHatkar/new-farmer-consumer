
const express = require("express")
const authorizeRoles = require("../middlewares/roleMiddleware")
const verifyToken  = require("../middlewares/authMiddleware")
const {getMyProfile , updateMyProfile} = require("../controllers/authController")

const router = express.Router()
//only admin can access
router.get("/admin" , verifyToken , authorizeRoles("admin") ,  (req,res) =>{
    res.json({message: "Welcome admin"})
})
//only farmer and admin
router.get("/farmer" , verifyToken,authorizeRoles("admin" , "farmer") ,  (req,res) =>{
    res.json({message: "Welcome farmer"})
})
//all can access
router.get("/consumer" , verifyToken , authorizeRoles("admin" , "farmer" , "consumer") ,  (req,res) =>{
    res.json({message: "Welcome consumer"})
})

router.get("/me" ,verifyToken, getMyProfile , (req , res) =>{
   res.json({message:"profile.."})
})
router.put("/me" ,verifyToken ,  updateMyProfile , (req , res) =>{
   res.json({message:"updated profile.."})
})


module.exports = router;