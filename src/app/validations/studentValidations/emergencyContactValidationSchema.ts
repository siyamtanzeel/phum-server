import { z } from 'zod';

export const emergencyContactValidationSchema = z
  .string({ required_error: 'Emergency contact number is required' })
  .trim()
  .min(10, 'Emergency contact number must be at least 10 digits')
  .max(15, 'Emergency contact number cannot exceed 15 digits')
  .refine((value) => /^\+?[0-9]+$/.test(value), {
    message:
      'Emergency contact number must contain only digits, optionally starting with +',
  })
  .refine(
    (value) => {
      // Remove + if present for further validation
      const digitsOnly = value.startsWith('+') ? value.slice(1) : value;
      // Check for Bangladeshi numbers or general valid length
      return (
        digitsOnly.length >= 10 &&
        digitsOnly.length <= 14 && // Adjusted for international codes
        (/^01[3-9][0-9]{8}$/.test(digitsOnly) || // Bangladeshi mobile (e.g., 01712345678)
          /^[0-9]{10,14}$/.test(digitsOnly)) // General number (10-14 digits)
      );
    },
    {
      message:
        'Emergency contact number must be a valid Bangladeshi number or a 10-14 digit number',
    },
  );

export const updateEmergencyContactValidationSchema = z
  .string({ required_error: 'Emergency contact number is required' })
  .trim()
  .min(10, 'Emergency contact number must be at least 10 digits')
  .max(15, 'Emergency contact number cannot exceed 15 digits')
  .refine((value) => /^\+?[0-9]+$/.test(value), {
    message:
      'Emergency contact number must contain only digits, optionally starting with +',
  })
  .refine(
    (value) => {
      // Remove + if present for further validation
      const digitsOnly = value.startsWith('+') ? value.slice(1) : value;
      // Check for Bangladeshi numbers or general valid length
      return (
        digitsOnly.length >= 10 &&
        digitsOnly.length <= 14 && // Adjusted for international codes
        (/^01[3-9][0-9]{8}$/.test(digitsOnly) || // Bangladeshi mobile (e.g., 01712345678)
          /^[0-9]{10,14}$/.test(digitsOnly)) // General number (10-14 digits)
      );
    },
    {
      message:
        'Emergency contact number must be a valid Bangladeshi number or a 10-14 digit number',
    },
  )
  .optional();
