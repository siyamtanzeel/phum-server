import { string, z } from 'zod';
import { academicSemesterNames } from '../academicSemester/academicSemester.constants';
import { guardianValidationSchema } from '../../validations/studentValidations/guardianValidationSchema';
import { localGuardianValidationSchema } from '../../validations/studentValidations/localGuardianValidationSchema';
import { dateOfBirthValidationSchema } from '../../validations/studentValidations/dateOfBirthValidationSchema';
import { contactNoValidationSchema } from '../../validations/studentValidations/contactNoValidationSchema';
import { emergencyContactValidationSchema } from '../../validations/studentValidations/emergencyContactValidationSchema';
import bloodGroupValidationSchema from '../../validations/studentValidations/bloodGroupValidationSchema';
import addressValidationSchema from '../../validations/studentValidations/addressValidationSchema';
import { yearValidationSchema } from '../../validations/admissionSemester/yearValidationSchema';
import { studentNameValidationSchema } from '../../validations/studentValidations/studentNameValidationSchema';
import { profileImageValidationSchema } from '../../validations/studentValidations/profileImageValidationSchema';
import { isActiveValidationSchema } from '../../validations/studentValidations/isActiveValidationSchema';

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
const updateStudentValidationSchema = studentValidationSchema
  .partial()
  .strict();
// Export the Zod schema for validation
// Optional: Export inferred TypeScript type from Zod schema
export type TStudentZod = z.infer<typeof studentValidationSchema>;

export const studentValidation = {
  studentValidationSchema,
  updateStudentValidationSchema,
};
