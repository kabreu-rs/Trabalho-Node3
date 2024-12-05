import express from 'express';
import {listUsers, viewProfile, createUser, setPermissions, updateProfilePicture} from '../controllers/userController.js';
import {isAuth, hasPermission} from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/'});

router.get('/list', isAuth, hasPermission('USERS'), listUsers);
router.post('/create', isAuth, hasPermission('USERS'), createUser);
router.post('/permissions', isAuth, hasPermission('USERS'), setPermissions);
router.get('/profile/:userId', isAuth, hasPermission('PROFILE'), viewProfile);
router.post('/profile/:userId/photo', isAuth, hasPermission('PROFILE'), upload.single('photo'), updateProfilePicture);


export default router;
