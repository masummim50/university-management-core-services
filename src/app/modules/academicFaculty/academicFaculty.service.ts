import { AcademicFaculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicFaculyFilterType } from './academicFaculty.interface';

// get data
const getAllFromDb = async (
  filters: academicFaculyFilterType,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
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

  const result = await prisma.academicFaculty.findMany({
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    skip,
    take: limit,
  });
  const total = await prisma.academicFaculty.count({
    where: {
      title: {
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
const insertIntoDb = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

const getById = async (id: string): Promise<AcademicFaculty | null> => {
  const data = await prisma.academicFaculty.findUnique({
    where: { id },
  });
  return data;
};

export const AcademicFacultyServices = {
  insertIntoDb,
  getAllFromDb,
  getById,
};
