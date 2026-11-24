import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global variables
const currency = 'inr';
const deliveryCharge = 10;

//Initializing stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD Method
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const ordersData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(ordersData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        return res.json({ success: true, message: 'Order Saved' })
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}
// Placing orders using Stripe Method
const placeOrderStripe = async () => {

}


// Placing orders using Razorpay Method
const placeOrderRazorpay = async () => {

}
// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, orders });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}
// User Orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        return res.json({ success: true, orders });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }


}
// Update Order Status from Admin Panel
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        return res.json({ success: true, message: "Status Updated" })
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export { verifyStripe, placeOrderCOD, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus };