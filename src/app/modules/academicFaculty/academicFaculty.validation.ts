import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({ required_error: 'Academic Faculty Name is required!' }),
});

export default academicFacultyValidationSchema;
