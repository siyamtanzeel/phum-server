import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  name: z
    .string({ required_error: 'Academic Department name is required!' })
    .min(4),
  academicFaculty: z
    .string({ required_error: 'Academic Faculty name is required!' })
    .min(4),
});
export default academicDepartmentValidationSchema;
