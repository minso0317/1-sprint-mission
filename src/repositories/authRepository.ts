import { User } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import { CreateUserDTO } from '../DTO/userDTO';

async function findById(id: number) {
  return await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string) {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
}

async function save(user: CreateUserDTO) {
  return await prismaClient.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
    },
  });
}

async function update(id: number, data: User) {
  return await prismaClient.user.update({
    where: {
      id,
    },
    data: data,
  });
}

// async function createOrUpdate(provider, providerId: string, email: string, nickname: string) {
//   return await prismaClient.user.upsert({
//     where: { provider, providerId },
//     update: { email, nickname },
//     create: { provider, providerId, email, nickname },
//   });
// }

export default {
  findById,
  findByEmail,
  save,
  update,
  // createOrUpdate,
};
