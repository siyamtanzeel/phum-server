import { z } from 'zod';
import { studentValidation } from '../student/student.validation';

const createStudentValidationSchema = z
  .object({
    student: studentValidation.studentValidationSchema,
    password: z.string().min(1).max(20),
  })
  .strict();

export const userValidation = {
  createStudentValidationSchema,
};
