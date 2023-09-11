import { AcademicDepartment } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicDepartmentFilterType } from './academicDepartment.interface';

const insertIntoDb = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
  });

  return result;
};

const getAllDepartments = async (
  filters: academicDepartmentFilterType,
  options: IPaginationOptions
) => {
  const { searchTerm } = filters;
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const data = await prisma.academicDepartment.findMany({
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    skip,
    take: limit,
  });
  const total = await prisma.academicDepartment.count({
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
  });

  return {
    data,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string): Promise<AcademicDepartment | null> => {
  const data = await prisma.academicDepartment.findUnique({
    where: { id },
  });
  return data;
};

export const academicDepartmentServices = {
  insertIntoDb,
  getAllDepartments,
  getById,
};
