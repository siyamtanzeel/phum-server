import { Request, RequestHandler, Response } from 'express';
import studentValidationSchema from '../student/student.validation';
import status from 'http-status';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
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
});
const getAllUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await userService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrieved users!',
    data: result,
  });
});

export const userController = {
  createStudent,
  getAllUsers,
};
