import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseServices.createCourse(req.body);
  sendResponse(res, httpStatus.OK, true, 'Course created Successfully', result);
});

const getCourse = catchAsync(async (req: Request, res: Response) => {
  // sort through the req url for queries
  console.log('course query: ', req.query);
  const options = pick(req.query, ['page', 'limit']);
  const filters = pick(req.query, ['searchTerm', 'code', 'credits']);

  const { meta, data } = await courseServices.getCourse(filters, options);

  // send response finally
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Course retrieved Successfully',
    data,
    meta
  );
});

export const courseController = {
  createCourse,
  getCourse,
};
