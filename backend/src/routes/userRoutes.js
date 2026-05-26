import express from "express";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/authController.js";

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


export default router;