import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getFacultyById);
router.post(
  '/',
  validateRequest(FacultyValidation.create),
  FacultyController.insertIntoDb
);

export const FacultyRoutes = router;
