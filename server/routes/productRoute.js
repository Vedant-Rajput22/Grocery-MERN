import express from 'express';
import { addProduct, productList, productById, changeStock, productFootprint, deleteProduct } from '../controllers/productController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

// Authenticate first to avoid unnecessary uploads for unauthorized requests
productRouter.post('/add', authSeller, upload.array('images', 6), addProduct);
productRouter.get('/list', productList);
// Use path param for product id and GET semantics
productRouter.get('/:id', productById);
productRouter.get('/:id/footprint', productFootprint);
productRouter.delete('/:id', authSeller, deleteProduct);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
