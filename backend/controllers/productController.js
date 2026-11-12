import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

//function to add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestSeller, sizes } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imageUrls = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )

        const productsData = {
            name,
            description,
            image: imageUrls,
            price: Number(price),
            category,
            subCategory,
            bestSeller: (bestSeller === "true") ? true : false,
            sizes: JSON.parse(sizes),
            date: Date.now(),
        }

        // console.log(productsData);
        const product = new productModel(productsData);
        await product.save();

        return res.json({ success: true, message: "Products added" });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

//function to remove product
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        return res.json({ success: true, message: "Product removed" });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

//function to list products
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({ success: true, products });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

//function to get single product info
export const singleProduct = async (req, res) => {
    try {
        const { productID } = req.body;
        const product = await productModel.findById(productID);
        return res.json({ success: true, product });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export default { listProducts, addProduct, removeProduct, singleProduct };

