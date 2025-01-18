import { Model, Types } from 'mongoose';

export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: IUserName;
  gender: 'male' | 'female' | 'other';
  dob?: string;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}

// for creating static
export interface StudentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent | null>;
}

// for creating instance

// export interface IStudentMethods {
//   isUserExists(id: string): Promise<IStudent | null>;
// }

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   IStudentMethods
// >;
