import { z } from 'zod';

// isActive Validation (Optional with Default)
export const isActiveValidationSchema = z
  .enum(['active', 'blocked'], {
    errorMap: (issue, ctx) => {
      if (issue.code === 'invalid_enum_value') {
        return {
          message: `Status must be either 'active' or 'blocked'. ${ctx.data ? `'${ctx.data}' is invalid.` : ''}`,
        };
      }
      return { message: 'Invalid status' };
    },
  })
  .default('active') // Default to 'active' if undefined
  .optional(); // Make it optional to align with default behavior
