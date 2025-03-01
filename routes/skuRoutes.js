import express from 'express';
import SkuController from '../controller/Sku.Controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, SkuController.createSKU);

export default router; 