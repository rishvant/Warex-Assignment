import express from 'express';
import SkuController from '../controller/Sku.Controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/get_sku/:user_id', authenticate, SkuController.getSKUByUserId);
router.post('/create_sku', authenticate, SkuController.createSKU);

export default router;