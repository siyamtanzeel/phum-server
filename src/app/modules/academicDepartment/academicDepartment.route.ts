import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import academicDepartmentValidationSchema from './academicDepartment.validation';
import { academicFacultyController } from '../academicFaculty/academicFaculty.controller';
import { academicDepartmentController } from './academicDepartment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(academicDepartmentValidationSchema),
  academicDepartmentController.createAcademicDepartment,
);
router.get(
  '/all-departments',
  academicDepartmentController.getAllAcademicDepartments,
);
router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);

export const academicDepartmentRoutes = router;
