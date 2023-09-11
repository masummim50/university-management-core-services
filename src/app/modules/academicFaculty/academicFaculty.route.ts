import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.get('/', AcademicFacultyController.getAllFaculty);
router.get('/:id', AcademicFacultyController.getFacultyById);
router.post(
  '/',
  validateRequest(academicFacultyValidation.create),
  AcademicFacultyController.insertIntoDb
);

export const academicFacultyRoutes = router;
