import express from 'express';
import {productIndex} from '../controllers/productController.js';
import { isAuth, hasPermission } from '../middleware/auth.js'; 

const router = express.Router();

router.get('/product',(req, res) => res.render('product/index',{ message: 'Bem-vindo à página de produtos!' }));

export default router;
