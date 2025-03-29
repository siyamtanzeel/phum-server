import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import status from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Students retrieved successfully',
    data: result,
  });
});
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student with the ID of ${id} retrieved successfully`,
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await studentService.updateStudentInDB(id, payload);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student with the ID of ${id} updated successfully`,
    data: result,
  });
});
export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
