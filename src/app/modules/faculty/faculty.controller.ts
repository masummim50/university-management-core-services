import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyServices } from './faculty.service';

//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const data = await AcademicSemesterServices.insertIntoDb(req.body);
//     sendResponse(
//       res,
//       httpStatus.OK,
//       true,
//       'Semester Created Successfully',
//       data
//     );
//   } catch (error) {
//     next(error);
//   }
// };
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log('req query:', req.query);
  const filters = await pick(req.query, ['searchTerm']);
  console.log('filters: ', filters);
  const options = await pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  console.log('options: ', options);

  const { data, meta } = await FacultyServices.getAllFromDb(filters, options);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Faculty retrieved Successfully',
    data,
    meta
  );
});

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const data = await FacultyServices.insertIntoDb(req.body);
  sendResponse(res, httpStatus.OK, true, 'Faculty Created Successfully', data);
});

const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const data = await FacultyServices.getById(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Faculty Retrieved Successfully',
    data
  );
});

export const FacultyController = {
  insertIntoDb,
  getAllFaculty,
  getFacultyById,
};
