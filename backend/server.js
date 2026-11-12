import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();
connectCloudinary();


//middlewares
app.use(cors());
app.use(express.json());


//api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res)=>{
    res.send('Server is working fine boss');
});

app.listen(PORT,()=>{
    console.log("Server running at local host ",PORT);
    
})