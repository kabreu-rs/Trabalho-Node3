import bcrypt from 'bcrypt';
import path from'path';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const login = async(req ,res) => {
    const {email, password } = req.body;
    const user = await prisma.user.findUnique({ where: {email}});

    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).send('Credenciais inválidas');
    }

    req.session.user = {id: user.id , email: user.email, role: user.role};
    res.redirect('/');
};

export const register = async(req, res) =>{
    const {name, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password , 10);
    const photo = req.file;

    let photoPath = null;
    if(photo){
        photoPath = path.join('uploads', photo.filename);
    }
    
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER',
                imageId: photoPath,
            },
        });
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar usuário');
    }
    
};