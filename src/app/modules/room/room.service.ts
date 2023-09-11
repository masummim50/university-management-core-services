import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createRoom = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
  });
  return result;
};

const getRooms = async (): Promise<Room[] | null> => {
  const result = await prisma.room.findMany();
  return result;
};

const getRoomById = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const roomServices = {
  createRoom,
  getRoomById,
  getRooms,
};
