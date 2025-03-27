import { z } from 'zod';
import studentValidationSchema from '../student/student.validation';

const createStudentValidationSchema = z.object({
  student: studentValidationSchema,
  password: z.string().min(1).max(20),
});

export const userValidation = {
  createStudentValidationSchema,
};
