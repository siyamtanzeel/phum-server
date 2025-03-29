import { z } from 'zod';

export const guardianValidationSchema = z.object({
  fatherName: z
    .string({ required_error: 'Father name is required' })
    .trim()
    .min(1, 'Father name cannot be empty')
    .max(30, 'Father name cannot exceed 30 characters')
    .refine((value) => /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(value), {
      message:
        'Father name must start with a capital letter, contain only letters, and spaces if needed',
    }),

  fatherOccupation: z
    .string({ required_error: 'Father occupation is required' })
    .trim()
    .min(2, 'Father occupation must be at least 2 characters')
    .max(50, 'Father occupation cannot exceed 50 characters')
    .refine((value) => /^[A-Za-z\s-]+$/.test(value), {
      message:
        'Father occupation must contain only letters, spaces, or hyphens',
    }),

  fatherContactNo: z
    .string({ required_error: 'Father contact number is required' })
    .trim()
    .min(10, 'Father contact number must be at least 10 digits')
    .max(15, 'Father contact number cannot exceed 15 digits')
    .refine((value) => /^\+?[0-9]+$/.test(value), {
      message:
        'Father contact number must contain only digits, optionally starting with +',
    }),

  motherName: z
    .string({ required_error: 'Mother name is required' })
    .trim()
    .min(1, 'Mother name cannot be empty')
    .max(30, 'Mother name cannot exceed 30 characters')
    .refine((value) => /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(value), {
      message:
        'Mother name must start with a capital letter, contain only letters, and spaces if needed',
    }),

  motherOccupation: z
    .string({ required_error: 'Mother occupation is required' })
    .trim()
    .min(2, 'Mother occupation must be at least 2 characters')
    .max(50, 'Mother occupation cannot exceed 50 characters')
    .refine((value) => /^[A-Za-z\s-]+$/.test(value), {
      message:
        'Mother occupation must contain only letters, spaces, or hyphens',
    }),

  motherContactNo: z
    .string({ required_error: 'Mother contact number is required' })
    .trim()
    .min(10, 'Mother contact number must be at least 10 digits')
    .max(15, 'Mother contact number cannot exceed 15 digits')
    .refine((value) => /^\+?[0-9]+$/.test(value), {
      message:
        'Mother contact number must contain only digits, optionally starting with +',
    }),
});
