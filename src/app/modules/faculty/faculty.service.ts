import { Faculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { FaculyFilterType } from './faculty.interface';

// get data
const getAllFromDb = async (
  filters: FaculyFilterType,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const result = await prisma.faculty.findMany({
    where: {
      firstName: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    skip,
    take: limit,
  });
  const total = await prisma.faculty.count({
    where: {
      firstName: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// insert data
const insertIntoDb = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

const getById = async (id: string): Promise<Faculty | null> => {
  const data = await prisma.faculty.findUnique({
    where: { id },
  });
  return data;
};

export const FacultyServices = {
  insertIntoDb,
  getAllFromDb,
  getById,
};
