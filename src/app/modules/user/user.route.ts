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
router.delete('/delete-student/:id', userController.deleteStudent);
router.get('/all-users', userController.getAllUsers);
router.get('/find/:id', userController.getSingleUser);

export const userRoutes = router;
