const mongoose = require("mongoose")

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
    farmerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Product" , productSchema) 