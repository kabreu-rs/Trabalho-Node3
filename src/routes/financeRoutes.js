import express from 'express';
import {financeIndex }from '../controllers/financeController.js';
import { hasPermission, isAuth} from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuth , hasPermission('FINANCE'),financeIndex);

export default router;