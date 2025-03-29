import { z } from 'zod';

// Admission Semester Year Validation (Required)
export const yearValidationSchema = z
  .string({ required_error: 'Admission Semester Year is required' })
  .trim()
  .length(4, 'Year must be exactly 4 digits')
  .refine((value) => /^\d{4}$/.test(value), {
    message: 'Year must contain only digits',
  })
  .refine(
    (value) => {
      const year = parseInt(value, 10);
      const currentYear = new Date().getFullYear();
      return year >= 2000 && year <= currentYear + 1; // Allowing next year
    },
    {
      message: 'Year must be between 2000 and next year',
    },
  );
