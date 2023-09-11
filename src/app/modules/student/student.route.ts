import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';
const router = express.Router();

router.get('/', studentController.getAllStudent);
router.get('/:id', studentController.getStudentById);
router.post(
  '/',
  validateRequest(studentValidation.create),
  studentController.insertIntoDb
);
router.patch(
  '/:id',
  validateRequest(studentValidation.update),
  studentController.updateStudent
);
router.delete('/:id', studentController.deleteStudentById);

export const studentRoutes = router;
