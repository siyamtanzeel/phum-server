import status from 'http-status';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = {
    count: await Student.countDocuments(),
    students: await Student.find().populate([
      'admissionSemester',
      'academicDepartment',
    ]),
  };
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate([
    'admissionSemester',
    'user',
  ]);
  if (!result) {
    throw new AppError(status.NOT_FOUND, `No student found!`);
  }
  return result;
};
const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  if (Object.keys(payload).length == 0) {
    throw new AppError(status.NOT_ACCEPTABLE, 'No fields sent for update!');
  }
  const { name, guardian, localGuardian, ...remainingData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    runValidators: true,
    new: true,
  }).populate(['admissionSemester']);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'Student was not found!');
  }
  return result;
};
export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
};
