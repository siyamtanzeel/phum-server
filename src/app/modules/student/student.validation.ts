import { string, z } from 'zod';
import { academicSemesterNames } from '../academicSemester/academicSemester.constants';
import { guardianValidationSchema } from '../../validations/studentValidations/guardianValidationSchema';
import { localGuardianValidationSchema } from '../../validations/studentValidations/localGuardianValidationSchema';
import {
  dateOfBirthValidationSchema,
  updateDateOfBirthValidationSchema,
} from '../../validations/studentValidations/dateOfBirthValidationSchema';
import {
  contactNoValidationSchema,
  updateContactNoValidationSchema,
} from '../../validations/studentValidations/contactNoValidationSchema';
import {
  emergencyContactValidationSchema,
  updateEmergencyContactValidationSchema,
} from '../../validations/studentValidations/emergencyContactValidationSchema';

import { yearValidationSchema } from '../../validations/admissionSemester/yearValidationSchema';
import {
  studentNameValidationSchema,
  updateStudentNameValidationSchema,
} from '../../validations/studentValidations/studentNameValidationSchema';
import { profileImageValidationSchema } from '../../validations/studentValidations/profileImageValidationSchema';
import { isActiveValidationSchema } from '../../validations/studentValidations/isActiveValidationSchema';
import {
  bloodGroupValidationSchema,
  updateBloodGroupValidationSchema,
} from '../../validations/studentValidations/bloodGroupValidationSchema';
import { addressValidationSchema } from '../../validations/studentValidations/addressValidationSchema';

// Zod schema for TStudent
const studentValidationSchema = z
  .object({
    name: studentNameValidationSchema,
    gender: z.enum(['Male', 'Female'], {
      required_error: 'Gender is required',
      invalid_type_error: 'Gender must be Male or Female',
    }),
    dateOfBirth: dateOfBirthValidationSchema,
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    contactNo: contactNoValidationSchema,
    emergencyContactNo: emergencyContactValidationSchema,
    bloodGroup: bloodGroupValidationSchema,
    presentAddress: addressValidationSchema('Present'),
    permanentAddress: addressValidationSchema('Permanent'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester: z.object({
      name: z.enum([...academicSemesterNames] as [string, ...string[]], {
        required_error: 'Invalid Semester Name',
      }),
      year: yearValidationSchema,
    }),
    academicDepartment: z.string({
      required_error: 'Academic Department name is required',
    }),
    profileImage: profileImageValidationSchema, // Could be optional if needed
    isActive: isActiveValidationSchema,
  })
  .strict();
const updateStudentValidationSchema = z
  .object({
    name: updateStudentNameValidationSchema,
    gender: z
      .enum(['Male', 'Female'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be Male or Female',
      })
      .optional(),
    dateOfBirth: updateDateOfBirthValidationSchema,
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format')
      .optional(),
    contactNo: updateContactNoValidationSchema,
    emergencyContactNo: updateEmergencyContactValidationSchema,
    bloodGroup: updateBloodGroupValidationSchema,
    presentAddress: addressValidationSchema('Present').optional(),
    permanentAddress: addressValidationSchema('Permanent').optional(),
    guardian: guardianValidationSchema.optional(),
    localGuardian: localGuardianValidationSchema.optional(),
    admissionSemester: z
      .object({
        name: z
          .enum([...academicSemesterNames] as [string, ...string[]], {
            required_error: 'Invalid Semester Name',
          })
          .optional(),
        year: yearValidationSchema.optional(),
      })
      .optional(),
    academicDepartment: z
      .string({
        required_error: 'Academic Department name is required',
      })
      .optional(),
    profileImage: profileImageValidationSchema.optional(), // Could be optional if needed
    isActive: isActiveValidationSchema.optional(),
  })
  .strict();
// Export the Zod schema for validation
// Optional: Export inferred TypeScript type from Zod schema
export type TStudentZod = z.infer<typeof studentValidationSchema>;

export const studentValidation = {
  studentValidationSchema,
  updateStudentValidationSchema,
};
