import { z } from 'zod';

const academicFacultyValidationSchema = z
  .object({
    name: z.string({ required_error: 'Academic Faculty Name is required!' }),
  })
  .strict({
    message:
      'You should provide the faculty name only! other informations will be added in the server.',
  });

export default academicFacultyValidationSchema;
