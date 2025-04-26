import { z } from 'zod';

// Blood Group Validation (Required)
export const bloodGroupValidationSchema = z.enum(
  ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_enum_value') {
        return {
          message: `Blood group must be one of: ${ctx.data ? `'${ctx.data}' is invalid. Valid options are: ` : ''}A+, A-, B+, B-, AB+, AB-, O+, O-`,
        };
      }
      return { message: 'Invalid blood group' };
    },
  },
);

// Blood Group Validation (Required)
export const updateBloodGroupValidationSchema = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_enum_value') {
        return {
          message: `Blood group must be one of: ${ctx.data ? `'${ctx.data}' is invalid. Valid options are: ` : ''}A+, A-, B+, B-, AB+, AB-, O+, O-`,
        };
      }
      return { message: 'Invalid blood group' };
    },
  })
  .optional();
