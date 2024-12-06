import express from 'express';
//import {reportIndex} from '../controllers/reportController.js';
//import { isAuth, hasPermission} from '../middleware/auth.js';

const router = express.Router();

router.get('/report',(req, res)=>res.render('report/index', { message: 'Bem-vindo à página de relatórios!' }));

export default router;

//router.get('/finance',(req, res) =>res.render('finance/index'));