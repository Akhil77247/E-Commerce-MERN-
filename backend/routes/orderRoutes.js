import express from 'express';
import {placeOrderCOD,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateOrderStatus, verifyStripe} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//All admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateOrderStatus);

//Payment features
orderRouter.post('/COD',authUser,placeOrderCOD);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//User features
orderRouter.post('/userorders',authUser,userOrders);


//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;
