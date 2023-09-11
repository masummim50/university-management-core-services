import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';

// const insertIntoDb = async (
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
const getAcademicSemesters = catchAsync(async (req: Request, res: Response) => {
  console.log('req query:', req.query);
  const filters = await pick(req.query, ['year', 'code', 'searchTerm']);
  console.log('filters: ', filters);
  const options = await pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  console.log('options: ', options);

  const { data, meta } = await AcademicSemesterServices.getAllFromDb(
    filters,
    options
  );
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Semesters retrieved Successfully',
    data,
    meta
  );
});
const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const data = await AcademicSemesterServices.insertIntoDb(req.body);
  sendResponse(res, httpStatus.OK, true, 'Semester Created Successfully', data);
});

const getSemesterById = catchAsync(async (req: Request, res: Response) => {
  const data = await AcademicSemesterServices.getById(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Semester Retrieved Successfully',
    data
  );
});

export const AcademicSemesterController = {
  getAcademicSemesters,
  insertIntoDb,
  getSemesterById,
};
