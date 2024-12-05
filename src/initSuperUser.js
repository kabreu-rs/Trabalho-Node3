import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


async function createSuperUser() {
    const superUser = await prisma.user.findUnique({
        where:{ email:'superuser@example.com'},
    });

    if(!superUser){
        await prisma.user.create({
            data: {
                name: 'Super User',
                email: 'superuser@example.com',
                password: bcrypt.hashSync('superpassword' , 10),
                role: 'SUPERUSER',
            },
        });
    }
    
}

createSuperUser()
  .catch(e => console.error(e))
  .finally(async()=>{
    await prisma.$disconnect();
  });