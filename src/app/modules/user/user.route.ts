import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.post('/create-student', userController.createStudent);
router.get('/users', userController.getAllUsers);

export const userRoutes = router;
