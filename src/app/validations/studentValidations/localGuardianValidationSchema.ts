import { z } from 'zod';

export const localGuardianValidationSchema = z.object({
  name: z
    .string({ required_error: 'Local guardian name is required' })
    .trim()
    .min(1, 'Local guardian name cannot be empty')
    .max(30, 'Local guardian name cannot exceed 30 characters')
    .refine((value) => /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(value), {
      message:
        'Local guardian name must start with a capital letter, contain only letters, and spaces if needed',
    }),

  occupation: z
    .string({ required_error: 'Local guardian occupation is required' })
    .trim()
    .min(2, 'Local guardian occupation must be at least 2 characters')
    .max(50, 'Local guardian occupation cannot exceed 50 characters')
    .refine((value) => /^[A-Za-z\s-]+$/.test(value), {
      message:
        'Local guardian occupation must contain only letters, spaces, or hyphens',
    }),

  contactNo: z
    .string({ required_error: 'Local guardian contact number is required' })
    .trim()
    .min(10, 'Local guardian contact number must be at least 10 digits')
    .max(15, 'Local guardian contact number cannot exceed 15 digits')
    .refine((value) => /^\+?[0-9]+$/.test(value), {
      message:
        'Local guardian contact number must contain only digits, optionally starting with +',
    }),

  address: z
    .string({ required_error: 'Local guardian address is required' })
    .trim()
    .min(5, 'Local guardian address must be at least 5 characters')
    .max(100, 'Local guardian address cannot exceed 100 characters')
    .refine((value) => /^[A-Za-z0-9\s,.-]+$/.test(value), {
      message:
        'Local guardian address must contain only letters, numbers, spaces, commas, dots, or hyphens',
    }),
});
