import express from 'express';
import CustomerController from '../controller/Customer.Controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, CustomerController.createCustomer);

export default router; 