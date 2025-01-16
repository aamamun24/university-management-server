import status from 'http-status';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendRespone';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
