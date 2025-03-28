import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/all-semesters',
  academicSemesterController.getAllAcademicSemesters,
);
router.get('/:id', academicSemesterController.getSingleAcademicSemester);
export const academicSemesterRoutes = router;
