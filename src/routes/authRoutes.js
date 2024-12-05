import express from 'express';
import {login, register} from '../controllers/authController.js';
import multer from 'multer';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest:'uploads/'});

router.get('/login', (req, res)=> res.render('auth/login'));
router.post('/login', login);
router.get('/register', (req, res)=> res.render('auth/register'));
router.post('/register',upload.single('photo'), register);

export default router;