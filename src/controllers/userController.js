import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const validRoles = ["SUPERUSER", "ADMIN", "USER"];

export const listUsers = async(req, res) => {
    const users = await prisma.user.findMany({
        include: {modules: true},
    });
    res.render('users/list', {users});
};

export const createUser = async(req, res)=>{
    const { name, email, password, role}= req.body;

    if (!validRoles.includes(role)) {
        return res.status(400).send('Função Inválida');
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).send('Email já registrado');
    }

    const hashedPassword = bcrypt.hashSync(password , 10);
    try {
       const user = await prisma.user.create({
           data:{
               name,
               email,
               password: hashedPassword,
               role: 'USER',
            },
        });
        res.redirect('/auth/login');
    
    } catch (error) {
       res.status(500).send('Erro ao criar usuário');
    }
};

export const setPermissions = async (req, res)=>{
    const{ userId, moduleIds} = req.body;
    await prisma.user.update({
        where:{id: userId},
        data: { modules:{ set: moduleIds.map(id =>({id}))}},
    });
    res.send('Permissões atualizadas');
};

export const viewProfile = async (req, res) => {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { modules: true },
    });
    if (!user) {
        return res.status(404).send('Usuário não encontrado');
    }
    res.render('users/profile', { user });
};

export const updateProfilePicture = async (req, res) => {
    const { userId } = req.params;
    const photo = req.file;

    if (!photo) {
        return res.status(400).send('Nenhuma foto enviada');
    }

    const photoPath = path.join('uploads', photo.filename);

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { imageId: photoPath },
        });
        res.redirect(`/user/profile/${userId}`);
    } catch (error) {
        res.status(500).send('Erro ao atualizar a foto do perfil');
    }
};


