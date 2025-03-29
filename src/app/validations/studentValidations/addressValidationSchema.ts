import { z } from 'zod';

// Present Address Validation (Required)
const addressValidationSchema = (param: string) => {
  return z
    .string({ required_error: `${param} address is required` })
    .trim()
    .min(5, `${param} address must be at least 5 characters`)
    .max(100, `${param} address cannot exceed 100 characters`)
    .refine((value) => /^[A-Za-z0-9\s,.-]+$/.test(value), {
      message: `${param} address must contain only letters, numbers, spaces, commas, dots, or hyphens`,
    });
};

export default addressValidationSchema;
