import { startSession, Types } from 'mongoose';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';
import TAcademicSemester from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createStudentIntoDB = async (
  studentData: Partial<TStudent>,
  password: string,
) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const userData: Partial<TUser> = {};
    const admissionSemester = await AcademicSemester.findOne(
      studentData.admissionSemester,
    );
    if (!admissionSemester) {
      throw new AppError(
        status.NOT_FOUND,
        'Admission in this semester is not available!',
      );
    }
    const academicDepartmentName = studentData.academicDepartment;
    const academicDepartment = await AcademicDepartment.findOne({
      name: academicDepartmentName,
    }).populate('academicFaculty');
    if (!academicDepartment) {
      throw new AppError(
        status.NOT_FOUND,
        `No department with the name of ${studentData.academicDepartment} exists`,
      );
    }
    userData.id = await generateStudentId(
      admissionSemester,
      academicDepartment,
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
      studentData.admissionSemester = admissionSemester!._id;
      studentData.academicDepartment = academicDepartment!._id;
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
        student: await newStudent[0].populate([
          { path: 'admissionSemester' },
          {
            path: 'academicDepartment',
            populate: {
              path: 'academicFaculty',
            },
          },
        ]),
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
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id });
  if (!result) {
    throw new Error(`No User found!`);
  }
  if (result.isDeleted) {
    throw new Error('User is deleted!');
  }
  result.password = null!;
  return result;
};

export const userService = {
  createStudentIntoDB,
  getAllUsersFromDB,
  deleteStudentFromDB,
  getSingleUserFromDB,
};
