import { TStudent } from './student.interface';
import { Student } from './student.model';

const deleteStudentFromDB = async (payload: { id: string }) => {
  const result = await Student.deleteOne({ id: payload.id });
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
export const studentService = {
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
