import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const placeOrder = async(req , res) => {
    try{
        const {productId , quantity} = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "ProductId and quantity are required" });
          }
      
          if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
          }
      

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          // 📦 Check stock
          if (product.quantity < quantity) {
            return res.status(400).json({
              message: `Only ${product.quantity} items available in stock`,
            });
          }

          // 💰 Calculate total price (backend should always calculate this)
        const totalPrice = product.price * quantity;


        const order = new Order({
            buyerId : req.user.id,
            farmerId : product.farmerId,
            productId,
            quantity,
            totalPrice,
            status:"pending",
        })

            await order.save();

         // 📉 Reduce stock
            product.quantity -= quantity;
            await product.save();


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


export {
    placeOrder,
    getFarmerOrders,
    updateOrderStatus,
  };