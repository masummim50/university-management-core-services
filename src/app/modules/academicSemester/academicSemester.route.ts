import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.get('/', AcademicSemesterController.getAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSemesterById);

router.post(
  '/',
  validateRequest(academicSemesterValidation.create),
  AcademicSemesterController.insertIntoDb
);

export const academicSemesterRoutes = router;
