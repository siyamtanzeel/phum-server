import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = {
    count: await Student.countDocuments(),
    students: await Student.find().populate(['admissionSemester', 'user']),
  };
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate([
    'admissionSemester',
    'user',
  ]);
  if (!result) {
    throw new Error(`No student found!`);
  }
  return result;
};
const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  if (Object.keys(payload).length == 0) {
    throw new Error('No fields sent for update!');
  }
  const targetStudent = await Student.findOne({ id });
  if (!targetStudent) {
    throw new Error('Invalid Student ID!');
  }
  const result = await targetStudent
    .updateOne({ payload })
    .populate(['admissionSemester', 'user']);
  return result;
};
export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
};
