
const Product = require("../models/productModel")

const addProduct = async (req ,res) => {
    try{
        const {name ,price ,  quantity} = req.body;
        const product = new Product({
            name ,
            price , 
            quantity,
            // image , 
            image: req.file ? req.file.filename : null,
            farmerId:req.user.id

            
        })

        await product.save()
    
        res.status(201).json({message:"product added successfully" , product})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getProducts = async(req , res) =>{
    try{
        const product = await Product.find({farmerId:req.user.id})

        res.status(200).json({message:"product list" , product})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getProductCount = async(req , res)=>{
    try{
        let count;
        if(req.user.role === "admin"){
            count = await Product.countDocuments()
        }
        else{
            count = await Product.countDocuments({farmerId:req.user.id})
        }
        res.status(200).json({messages:"count:" , count})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const deleteProduct = async (req , res) =>{
    try{
        const {id} = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)

        if(!deletedProduct){
           return res.status(404).json({message: "product not found"})
        }
        res.status(200).json({message:"product deleted successfully" , deletedProduct})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getSingleProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
//   const updateProduct = async (req, res) => {
//     try {

//         const product = await Product.findOne({
//             _id: req.params.id,
//             farmerId: req.user.id,
//           });
          

//       const updateData = {
//         name: req.body.name,
//         price: req.body.price,
//         quantity: req.body.quantity,
//       };
  
//       if (req.file) {
//         updateData.image = req.file.filename;
//       }
  
//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true, runValidators: true }
//       );
  
//       if (!updatedProduct) {
//         return res.status(404).json({ message: "Product not found" });
//       }
  
//       res.status(200).json({ message: "Product updated", updatedProduct });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
  


const updateProduct = async (req , res) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {$set :req.body},
            {new:true ,runValidators:true}
        )
        if(!updatedProduct){
            return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"Updated Product" , updatedProduct})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports = {
    addProduct , 
    getProducts,
    getProductCount,
    deleteProduct,
    getSingleProduct,
    updateProduct,
}