import { z } from 'zod';
import { studentNameValidationSchema } from '../../validations/studentValidations/studentNameValidationSchema';

const createStudentValidationSchema = z.object({
  student: studentNameValidationSchema,
  password: z.string().min(1).max(20),
});

export const userValidation = {
  createStudentValidationSchema,
};
