import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        min:1,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    image:{
        type:String,
        required:true,
    },
    public_id: {
        type: String, // for delete
        required: true,
      },

    farmerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},
{timestamps:true}
)

const Product = mongoose.model("Product", productSchema);
export default Product;