// import { Course } from '@prisma/client';
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

export const courseServices = {
  createCourse,
};
