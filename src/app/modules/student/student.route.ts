import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();
router.post('/create-student', studentController.createStudent);
router.delete('/delete-student', studentController.deleteStudent);
router.get('/students', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);

export const studentRoutes = router;
