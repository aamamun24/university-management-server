import { Student } from '../student.model';
import { IStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([{ $match: {id: id }}]);
  return result;
};

const createStudentIntoDB = async (studentData: IStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); // create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save(); // built in instance method
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
