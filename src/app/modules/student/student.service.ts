import { Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { studentFilterType } from './student.interface';

// get data
const getAllFromDb = async (
  filters: studentFilterType,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
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

  const result = await prisma.student.findMany({
    where: {
      firstName: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    skip,
    take: limit,
  });
  const total = await prisma.student.count({
    where: {
      firstName: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
  });
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

// insert data
const insertIntoDb = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};

const getById = async (id: string): Promise<Student | null> => {
  const data = await prisma.student.findUnique({
    where: { id },
  });
  return data;
};

const updateStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteStudentById = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicSemester: true,
      academicFaculty: true,
    },
  });
  return result;
};

export const studentServices = {
  insertIntoDb,
  getAllFromDb,
  getById,
  updateStudent,
  deleteStudentById,
};
