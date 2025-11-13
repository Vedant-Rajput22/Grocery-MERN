import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import seedProductsIfEmpty from './utils/seed.js';

const app = express();

const port = process.env.PORT || 3000;
await connectDB();
await connectCloudinary();
// Seed initial products once if collection is empty
await seedProductsIfEmpty();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://greencart-sand.vercel.app'];

// Stripe webhook must receive raw body
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Basic request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Cookie parser
app.use(cookieParser());

// CORS
app.use(cors({
    origin: (origin, cb) => {
        // Allow non-browser clients or same-origin
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(null, false);
    },
    credentials: true,
}));

// JSON body parser (after webhook)
app.use(express.json());


app.get('/', (req, res) => res.send('API is working!'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`PORT connected on ${port}`);
})
