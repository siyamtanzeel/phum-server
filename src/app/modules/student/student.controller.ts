import { Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import status from 'http-status';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    const zodParsedData = studentValidationSchema.parse(studentData);
    const result = await studentService.createStudentIntoDB(studentData);
    res.status(status.OK).send({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Failed to create student',
      error: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.deleteStudentFromDB(req.body);
    res.status(status.OK).send({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Failed to delete student',
      error: error,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    res.status(status.OK).send({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Failed to retrieve students',
      error: error,
    });
  }
};
const getSingleStudent: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await studentService.getSingleStudentFromDB(id);
    res.status(status.OK).send({
      success: true,
      message: `student with the ID of ${id} retrieved successfully`,
      data: result,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: `Failed to retrieve student with the ID of ${req.params.id}`,
      error: error,
    });
  }
};
export const studentController = {
  createStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
};
