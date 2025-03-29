import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Academic Department with the name of ${result.name} created successfully`,
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Departments retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Academic Department with the id of ${req.params.id} retrieved successfully`,
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
};
