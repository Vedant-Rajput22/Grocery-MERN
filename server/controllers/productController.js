import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData || '{}');
        // Normalize fields
        productData.price = Number(productData.price);
        productData.offerPrice = Number(productData.offerPrice ?? productData.price);
        if (typeof productData.tags === 'string') {
            productData.tags = productData.tags.split(',').map(t => t.trim()).filter(Boolean);
        }
        if (!Array.isArray(productData.tags)) productData.tags = [];
        const images = req.files;
        let imagesUrl = [];
        if (Array.isArray(images) && images.length) {
            imagesUrl = await Promise.all(images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            }));
        }
        await Product.create({...productData, images: imagesUrl});
        res.json({success: true, message: "Product Added"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Get Product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success: true, products});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Get Single Product : /api/product/:id
export const productById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }
        res.json({success: true, product});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Carbon footprint estimate: simple heuristic by category + tag modifiers
export const productFootprint = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const baseByCategory = {
            Vegetables: 0.3, // kg CO2e per unit
            Fruits: 0.4,
            Dairy: 2.0,
            Drinks: 0.6,
            Instant: 1.2,
            Bakery: 1.0,
            Grains: 0.8,
            Default: 0.9,
        };
        let base = baseByCategory[product.category] ?? baseByCategory.Default;

        // Tag-based modifiers
        const tagSet = new Set((product.tags || []).map(t => t.toLowerCase()));
        if (tagSet.has('local')) base *= 0.8;
        if (tagSet.has('plastic free')) base *= 0.9;
        if (tagSet.has('organic')) base *= 0.85;
        if (tagSet.has('high protein')) base *= 1.05;
        if (tagSet.has('imported')) base *= 1.2;

        // Scale by weight/implicit quantity (if provided), else by quantity = 1
        // Here, assume per unit. Include small tax to represent logistics variance
        const co2kg = Math.max(0.05, Number((base * 1.02).toFixed(2)));
        return res.json({ success: true, kgCO2e: co2kg });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, {inStock});
        res.json({success: true, message: "Stock Updated"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }   
}

// Delete Product : /api/product/:id (DELETE)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Product.findById(id);
        if (!found) return res.status(404).json({ success: false, message: 'Product not found' });
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
