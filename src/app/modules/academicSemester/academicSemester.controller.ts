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

export const academicSemesterController = {
  createAcademicSemester,
};
