import { model, Schema } from 'mongoose';
import TAcademicSemester, {
  TAcademicSemesterCodes,
  TAcademicSemesterMonths,
  TAcademicSemesterNames,
} from './academicSemester.interface';

export const academicSemesterNames: TAcademicSemesterNames[] = [
  'Summer',
  'Fall',
  'Autumn',
];
export const academicSemesterCodes: TAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterMonths: TAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCodes,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonths,
      required: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonths,
      required: true,
    },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  },
);

const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
