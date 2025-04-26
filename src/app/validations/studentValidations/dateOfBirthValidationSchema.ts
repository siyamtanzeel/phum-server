import { z } from 'zod';

export const dateOfBirthValidationSchema = z
  .string({ required_error: 'Date of birth is required' })
  .trim()
  .min(1, 'Date of birth cannot be empty')
  .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'Date of birth must be in YYYY-MM-DD format',
  })
  .refine(
    (value) => {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day); // month is 0-indexed in JS
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        year >= 1900 && // Minimum year
        year <= new Date().getFullYear() // Maximum year (current year)
      );
    },
    {
      message: 'Date of birth must be a valid date between 1900 and today',
    },
  );

export const updateDateOfBirthValidationSchema = z
  .string({ required_error: 'Date of birth is required' })
  .trim()
  .min(1, 'Date of birth cannot be empty')
  .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'Date of birth must be in YYYY-MM-DD format',
  })
  .refine(
    (value) => {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day); // month is 0-indexed in JS
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        year >= 1900 && // Minimum year
        year <= new Date().getFullYear() // Maximum year (current year)
      );
    },
    {
      message: 'Date of birth must be a valid date between 1900 and today',
    },
  )
  .optional();
