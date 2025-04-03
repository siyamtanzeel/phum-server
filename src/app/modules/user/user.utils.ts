import { Student } from '../student/student.model';

const generateStudentId = async (
  admissionSemester: any,
  academicDepartment: any,
) => {
  const { year, code: semesterCode } = admissionSemester;
  const facultyCode = await academicDepartment.academicFaculty?.code;
  const departmentCode = academicDepartment.code;
  let currentId =
    year +
    semesterCode +
    facultyCode +
    departmentCode +
    (1).toString().padStart(4, '0');
  const studentExists = await Student.findOne({
    admissionSemester: admissionSemester?._id,
    academicDepartment: academicDepartment._id,
  })
    .sort({ createdAt: -1 })
    .limit(1);
  if (!studentExists) {
    return currentId;
  } else {
    currentId =
      studentExists.id.slice(0, 10) +
      (parseInt(studentExists.id.slice(10, 14)) + 1)
        .toString()
        .padStart(4, '0');
  }
  return currentId;
};

export default generateStudentId;
