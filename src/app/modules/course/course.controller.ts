import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseServices.createCourse(req.body);
  sendResponse(res, httpStatus.OK, true, 'Course created Successfully', result);
});

export const courseController = {
  createCourse,
};
