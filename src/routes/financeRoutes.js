import express from 'express';
import {financeIndex }from '../controllers/financeController.js';
import { hasPermission, isAuth} from '../middleware/auth.js';

const router = express.Router();

router.get('/finance',(req, res) =>res.render('finance/index',{ message: 'Bem-vindo à página de finanças!'}));
//router.post('/index', index)

export default router;

//router.get('/login', (req, res)=> res.render('auth/login'));
//router.post('/login', login);