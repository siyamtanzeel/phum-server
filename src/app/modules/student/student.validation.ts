import { z } from 'zod';

// Zod schema for TName
const nameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).trim(),
  middleName: z.string().trim().optional(), // Optional field
  lastName: z.string({ required_error: 'Last name is required' }).trim(),
});

// Zod schema for TGuardian
const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father name is required' }).trim(),
  fatherOccupation: z
    .string({ required_error: 'Father occupation is required' })
    .trim(),
  fatherContactNo: z
    .string({ required_error: 'Father contact number is required' })
    .trim(),
  motherName: z.string({ required_error: 'Mother name is required' }).trim(),
  motherOccupation: z
    .string({ required_error: 'Mother occupation is required' })
    .trim(),
  motherContactNo: z
    .string({ required_error: 'Mother contact number is required' })
    .trim(),
});

// Zod schema for TLocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local guardian name is required' }).trim(),
  occupation: z
    .string({ required_error: 'Local guardian occupation is required' })
    .trim(),
  contactNo: z
    .string({ required_error: 'Local guardian contact number is required' })
    .trim(),
  address: z
    .string({ required_error: 'Local guardian address is required' })
    .trim(),
});

// Zod schema for TStudent
const studentValidationSchema = z.object({
  id: z.string({ required_error: 'Student ID is required' }).trim(),
  password: z.string({ required_error: 'Password is required' }).trim(),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  dateOfBirth: z.string().optional(), // Optional field
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  contactNo: z.string({ required_error: 'Contact number is required' }).trim(),
  emergencyContactNo: z
    .string({ required_error: 'Emergency contact number is required' })
    .trim(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(), // Optional field
  presentAddress: z
    .string({ required_error: 'Present address is required' })
    .trim(),
  permanentAddress: z
    .string({ required_error: 'Permanent address is required' })
    .trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string({ required_error: 'Profile image is required' }), // Could be optional if needed
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

// Export the Zod schema for validation
export default studentValidationSchema;

// Optional: Export inferred TypeScript type from Zod schema
export type TStudentZod = z.infer<typeof studentValidationSchema>;
