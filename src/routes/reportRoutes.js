import express from 'express';
import {reportIndex} from '../controllers/reportController.js';
import { isAuth, hasPermission} from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuth, hasPermission('REPORTS'), reportIndex);

export default router;