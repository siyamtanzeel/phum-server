import { model, Schema } from 'mongoose';
import TAcademicSemester from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterCodesMapper,
  academicSemesterMonths,
  academicSemesterNames,
} from './academicSemester.constants';

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
      type: String,
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

//checking if duplicate semester exists
academicSemesterSchema.pre('save', async function (next) {
  const similarSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (similarSemesterExists) {
    throw new Error(
      `${similarSemesterExists.name} semester in the year ${similarSemesterExists.year} already exists!`,
    );
  }
  if (academicSemesterCodesMapper[this.name] !== this.code) {
    throw new Error('Invalid Semester code!');
  }
  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
