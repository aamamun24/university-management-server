import status from 'http-status';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendRespone';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get student',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.deleteSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
