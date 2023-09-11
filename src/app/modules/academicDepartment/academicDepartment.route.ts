import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();
router.get('/', academicDepartmentController.getAllDepartments);
router.get('/:id', academicDepartmentController.getDepartmentById);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicDepartmentValidation.create),
  academicDepartmentController.insertIntoDb
);

export const academicDepartmentRoutes = router;
