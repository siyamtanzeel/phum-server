import { Request, RequestHandler, Response } from 'express';
import status from 'http-status';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student: studentData, password } = req.body;
  const result = await userService.createStudentIntoDB(studentData, password);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.deleteStudentFromDB(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
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
  deleteStudent,
};
