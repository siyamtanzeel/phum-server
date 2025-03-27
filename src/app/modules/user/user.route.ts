import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentValidationSchema),
  userController.createStudent,
);
router.get('/users', userController.getAllUsers);

export const userRoutes = router;
