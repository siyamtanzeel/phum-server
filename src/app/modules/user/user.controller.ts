import { Request, RequestHandler, Response } from 'express';
import studentValidationSchema from '../student/student.validation';
import status from 'http-status';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student: studentData, password } = req.body;
    const zodParsedStudentData = studentValidationSchema.parse(studentData);
    const result = await userService.createStudentIntoDB(
      zodParsedStudentData,
      password,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Successfully retrieved users!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
  getAllUsers,
};
