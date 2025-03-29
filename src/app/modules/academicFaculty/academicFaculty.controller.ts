import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Academic Faculty with the name of ${result.name} created successfully`,
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getSingleAcademicFacultyFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Academic Faculty with the id of ${req.params.id} retrieved successfully`,
    data: result,
  });
});
export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
};
