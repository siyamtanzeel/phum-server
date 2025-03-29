import { startSession, Types } from 'mongoose';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';
import TAcademicSemester from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';

const createStudentIntoDB = async (
  studentData: Partial<TStudent>,
  password: string,
) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const userData: Partial<TUser> = {};
    userData.id = await generateStudentId(
      studentData.admissionSemester as Partial<TAcademicSemester>,
    );
    userData.password = password;
    userData.role = 'student';
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new Error('failed to create user!');
    }
    if (Object.keys(newUser).length) {
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id;
      const admissionSemester = await AcademicSemester.findOne(
        studentData.admissionSemester,
      );
      studentData.admissionSemester = admissionSemester!._id;
      const studentExists = await new Student().studentExists(
        studentData.id as string,
      );
      if (studentExists) {
        throw new Error('Student already exists!');
      }
      const newStudent = await Student.create([studentData], { session });
      if (!newStudent.length) {
        throw new Error('failed to create student!');
      }
      await session.commitTransaction();
      return {
        user: newUser[0],
        student: newStudent[0],
      };
    }
    throw new Error('Failed to create Student');
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const deleteStudentFromDB = async (payload: string) => {
  const targetUser = await User.findOne({ id: payload });
  if (!targetUser) {
    throw new Error('Invalid student ID!');
  }
  const result = await targetUser.updateOne({ isDeleted: true });
  result.password = '';
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const userService = {
  createStudentIntoDB,
  getAllUsersFromDB,
  deleteStudentFromDB,
};
