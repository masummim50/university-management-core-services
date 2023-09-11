import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentServices } from './student.service';

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
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
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

  const { data, meta } = await studentServices.getAllFromDb(filters, options);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Students retrieved Successfully',
    data,
    meta
  );
});

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const data = await studentServices.insertIntoDb(req.body);
  sendResponse(res, httpStatus.OK, true, 'student Created Successfully', data);
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const data = await studentServices.getById(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'students Retrieved Successfully',
    data
  );
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const data = await studentServices.updateStudent(id, payload);
  sendResponse(res, httpStatus.OK, true, 'student updated Successfully', data);
});
const deleteStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await studentServices.deleteStudentById(id);
  sendResponse(res, httpStatus.OK, true, 'student deleted Successfully', data);
});

export const studentController = {
  insertIntoDb,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudentById,
};
