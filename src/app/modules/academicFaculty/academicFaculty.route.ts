import { Router } from 'express';
import academicFacultyValidationSchema from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);
router.get('/all-faculties', academicFacultyController.getAllAcademicFaculties);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
export const AcademicFacultyRoutes = router;
