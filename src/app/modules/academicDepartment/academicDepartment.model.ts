import { model, Schema } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExits = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExits) {
    throw new AppError(status.NOT_FOUND, 'This department already exit!');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExits = await AcademicDepartment.findOne(query);

  if (!isDepartmentExits) {
    throw new AppError(status.NOT_FOUND, 'This department does not exit!');
  }

  next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
