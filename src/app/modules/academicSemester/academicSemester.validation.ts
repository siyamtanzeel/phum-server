import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterNames,
} from './academicSemester.constants';

const createAcademicSemesterValidationSchema = z.object({
  name: z.enum([...academicSemesterNames] as [string, ...string[]], {
    required_error: 'Name is required',
  }),
  year: z.string({
    required_error: 'Year is required',
  }),
  code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
    required_error: 'Code is required',
  }),
  startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
    required_error: 'Start month is required',
  }),
  endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
    required_error: 'End month is required',
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
