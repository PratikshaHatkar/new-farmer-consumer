
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const register = async (req , res) =>{
    try{

    const {username , password , role} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({username , password:hashedPassword , role})
    await newUser.save();
    res.status(201).json({message:`User registered with username ${username}`})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"})
    }

}
const login = async (req , res) =>{
    try{
 
    const {username , password} = req.body
    const user = await User.findOne({username})

    if(!user){
        return res.status(404).json({message:`User with username ${username} is not found`})
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const token = jwt.sign(
        { id:user._id  ,
          username :user.username,
         role:user.role} ,
         process.env.JWT_SECRET,
         {expiresIn:"1h"}
         );
      res.status(200).json({token})
  }
  catch(err){
    res.status(500).json({message:"Something went wrong"})
  }
}


const logout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
  };


const getMyProfile = async (req , res) =>{
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
        res.status(404).json({message:"User not found"})
    }
    return res.json(user)

}
  
const updateMyProfile = async (req , res) =>{
    const {phone , address , farmName} = req.body;

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(404).json({message:"User not found"})
    }

    user.phone = phone || user.phone;
    user.address = address || user.address; 
    user.farmName = farmName || user.farmName; 

    await user.save()

    res.json(user)


}
  

module.exports = {
    register ,
    login,
    logout,
    getMyProfile , 
    updateMyProfile,
};