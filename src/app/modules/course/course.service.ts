// import { Course } from '@prisma/client';
import { Course } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';

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
  filters: any,
  options: any
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const courses = await prisma.course.findMany({
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
