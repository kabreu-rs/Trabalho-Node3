import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const isAuth = async(req, res, next) => {
    if (!req.session.user){
        return res.status(401).json({ error: 'Unauthorized'});
    }

    const user = await prisma.user.findUnique({
        where: {email: req.session.user.email},
        select: {email: true, role: true},
    });

    if(!user){
        return res.status(401).json({ error: 'Unauthorized'});
    }

    req.session.user = user;
    next();
};

export const hasPermission =(moduleName) => {
    return async(req, res, next) => {
        const user = await prisma.user.findUnique({
            where: {id: req.session.user.id},
            include: {modules: true},
        });

        const hasAccess = user.role ==='SUPERUSER' || user.modules.some(module => module.name === moduleName);
        await prisma.access.create({
            data: {
                userId : user.id,
                url: req.originalUrl,
                granted: hasAccess,
            },
        });

        if(!hasAccess){
            return res.status(403).render('error', { message : 'SEM PERMISSÃO PARA ACESSAR O MÓDULO ${moduleName}'});
        }

        next();
    };
};