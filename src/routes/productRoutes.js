import express from 'express';
import {productIndex} from '../controllers/productController.js';
import { isAuth, hasPermission } from '../middleware/auth.js'; 

const router = express.Router();

router.get('/', isAuth, hasPermission('PRODUCTS'), productIndex);

export default router;
