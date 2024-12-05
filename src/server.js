import express  from'express';
import session from'express-session';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import productRoutes from './routes/productRoutes.js';
import'./initSuperUser.js';

import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

console.log({
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_SECRET: process.env.APP_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
})

const prisma = new PrismaClient({
    log: [ 'query', 'info', 'warn', 'error' ],
});

const app = express();
const upload = multer({ dest: 'uploads/ '});

app.use (express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/finance', financeRoutes);
app.use('/reports', reportRoutes);
app.use('/product',productRoutes);
//app.use('/', viewRoutes);

app.get('/', (req, res) => {
    res.render('index', {title: 'Página inicial'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server iniciou na porta ${PORT}'));

export default app;
