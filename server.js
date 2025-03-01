import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import http from 'http';
import skuRoutes from './routes/skuRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import './cron/cronJob.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skus', skuRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
