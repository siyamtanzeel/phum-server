import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semesters retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getSingleAcademicSemesterFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Academic semester with the id of ${req.params.id} retrieved successfully`,
    data: result,
  });
});
const updateSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await academicSemesterService.updateSemesterInDB(id, payload);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Academic semester with the id of ${req.params.id} updated successfully`,
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSemester,
};
