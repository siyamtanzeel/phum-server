import { z } from 'zod';

export const studentNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim() // Removes leading/trailing whitespace
    .min(1, 'First name cannot be empty')
    .max(16, 'First name cannot exceed 16 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        'First name must start with a capital letter and contain only letters',
    }),

  middleName: z
    .string()
    .trim()
    .max(16, 'Middle name cannot exceed 16 characters')
    .refine((value) => !value || /^[A-Z][a-z]*$/.test(value), {
      message:
        'Middle name, if provided, must start with a capital letter and contain only letters',
    })
    .optional(), // Optional field

  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(1, 'Last name cannot be empty')
    .max(16, 'Last name cannot exceed 16 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message:
        'Last name must start with a capital letter and contain only letters',
    }),
});
