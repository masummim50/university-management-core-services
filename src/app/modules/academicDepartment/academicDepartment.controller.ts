import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentServices.insertIntoDb(req.body);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Department Created Successfully',
    result
  );
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['page', 'limit', 'skip']);
  const { data, meta } = await academicDepartmentServices.getAllDepartments(
    filters,
    options
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Department Retrieved Successfully',
    data,
    meta
  );
});

const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const data = await academicDepartmentServices.getById(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Department Retrieved Successfully',
    data
  );
});

export const academicDepartmentController = {
  insertIntoDb,
  getAllDepartments,
  getDepartmentById,
};
