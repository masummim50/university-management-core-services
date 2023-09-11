import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getBuildings = async (): Promise<Building[] | null> => {
  const result = await prisma.building.findMany();
  return result;
};

const getBuildingById = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const buildingServices = {
  createBuilding,
  getBuildings,
  getBuildingById,
};
