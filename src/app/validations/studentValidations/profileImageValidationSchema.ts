import { z } from 'zod';

// Profile Image Validation (Required)
export const profileImageValidationSchema = z
  .string({ required_error: 'Profile image is required' })
  .trim()
  .min(1, 'Profile image path cannot be empty')
  .max(255, 'Profile image path cannot exceed 255 characters')
  .refine(
    (value) => {
      // Check if it's a valid URL or a file path
      const urlRegex =
        /^(https?:\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp))$/i;
      const pathRegex = /^\/[A-Za-z0-9-_/]+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return urlRegex.test(value) || pathRegex.test(value);
    },
    {
      message:
        'Profile image must be a valid URL or file path ending with .jpg, .jpeg, .png, .gif, .bmp, or .webp',
    },
  );
// Update Profile Image Validation (Required)
export const UpdateProfileImageValidationSchema = z
  .string({ required_error: 'Profile image is required' })
  .trim()
  .min(1, 'Profile image path cannot be empty')
  .max(255, 'Profile image path cannot exceed 255 characters')
  .refine(
    (value) => {
      // Check if it's a valid URL or a file path
      const urlRegex =
        /^(https?:\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp))$/i;
      const pathRegex = /^\/[A-Za-z0-9-_/]+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return urlRegex.test(value) || pathRegex.test(value);
    },
    {
      message:
        'Profile image must be a valid URL or file path ending with .jpg, .jpeg, .png, .gif, .bmp, or .webp',
    },
  )
  .optional();
