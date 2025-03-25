import { startSession } from 'mongoose';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import userValidationSchema from './user.validation';

const createStudentIntoDB = async (
  studentData: Partial<TStudent>,
  password: string,
) => {
  const session = await startSession();
  try {
    await session.startTransaction();
    const userData: Partial<TUser> = {};
    userData.id = 'B220302022';
    userData.password = userValidationSchema.parse({ password }).password;
    userData.role = 'student';
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new Error('failed to create user!');
    }
    if (Object.keys(newUser).length) {
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id;
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
        user: newUser,
        student: newStudent,
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
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const userService = {
  createStudentIntoDB,
  getAllUsersFromDB,
};
