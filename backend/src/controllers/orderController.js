const Order = require("../models/orderModel")
const Product = require("../models/productModel")

const placeOrder = async(req , res) => {
    try{
        const {productId , quantity} = req.body;

        const product = await Product.findById(productId)

        const order = new Order({
            buyerId : req.user.id,
            farmerId : product.farmerId,
            productId,
            quantity,
            totalPrice:product.price * quantity,
        })

            await order.save();

           res.json({ message: "Order placed successfully", order });
        } catch (err) {
              res.status(500).json({ error: err.message });

             }
}

const getFarmerOrders = async(req , res) =>{
    try{
        const order = await Order.find({farmerId:req.user.id}).populate("productId buyerId");
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const updateOrderStatus = async (req , res) =>{
    try{
        const {status} = req.body

        const order = await Order.findById(req.params.id);

        if(order.farmerId.toString() !== req.user.id){
            return res.status(403).json({message:"Not allowed"})
        }

        order.status = status;

        await order.save();

        res.json({message:"order updated" , order})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}



module.exports = {
    placeOrder,
    getFarmerOrders , 
    updateOrderStatus,
}