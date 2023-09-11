// import { Course } from '@prisma/client';
import { Course } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { courseFilterType } from './course.interface';

const createCourse = async (data: any): Promise<any> => {
  const newResult = await prisma.$transaction(async tx => {
    const { preRequisite, ...courseData } = data;
    const newCourse = await tx.course.create({
      data: courseData,
    });

    if (preRequisite && preRequisite.length > 0) {
      for (let index = 0; index < preRequisite.length; index++) {
        await tx.courseToPrerequisite.create({
          data: {
            courseId: newCourse.id,
            preRequisiteId: preRequisite[index].courseId,
          },
        });
      }
    }

    return newCourse;
  });
  return newResult;
};

const getCourse = async (
  filters: courseFilterType,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, code, credits } = filters;
  const andConditions = [];
  if (code) {
    andConditions.push({
      code,
    });
  }
  if (credits) {
    const newCredit = parseFloat(credits);
    andConditions.push({
      credits: newCredit,
    });
  }

  const courses = await prisma.course.findMany({
    where: {
      title: {
        contains: searchTerm,
      },
      AND: andConditions,
    },
    skip,
    take: limit,
  });

  const total = await prisma.course.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: courses,
  };
};

export const courseServices = {
  createCourse,
  getCourse,
};
