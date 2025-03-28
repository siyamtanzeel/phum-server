import { Types } from 'mongoose';
import TAcademicSemester from '../academicSemester/academicSemester.interface';
import { Student } from '../student/student.model';
import AcademicSemester from '../academicSemester/academicSemester.model';

const generateStudentId = async (payload: Types.ObjectId) => {
  const admissionSemester = await AcademicSemester.findById(payload);
  const { year, code } = admissionSemester as TAcademicSemester;
  let currentId = year + code + (1).toString().padStart(4, '0');
  const studentExists = await Student.findOne({
    admissionSemester: admissionSemester?._id,
  })
    .sort({ createdAt: -1 })
    .limit(1);
  if (!studentExists) {
    return currentId;
  } else {
    currentId =
      studentExists.id.slice(0, 6) +
      (parseInt(studentExists.id.slice(6, 10)) + 1).toString().padStart(4, '0');
  }
  return currentId;
};

export default generateStudentId;
