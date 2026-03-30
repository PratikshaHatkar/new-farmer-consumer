const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    farmerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity: Number,
    totalPrice: Number,
    status:{
        type:String ,
        enum: ["pending" , "accepted" , "rejected" , "deliverd"],
        default:"pending",

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("Order" , orderSchema)