import { Router } from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';

const router = Router();

router.get('/all-students', studentController.getAllStudents);
router.get('/find/:id', studentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentValidationSchema),
  studentController.updateStudent,
);

export const studentRoutes = router;
