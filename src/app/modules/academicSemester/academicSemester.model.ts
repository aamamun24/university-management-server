import { model, Schema } from 'mongoose';
import { IAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExits = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExits) {
    throw new AppError(status.NOT_FOUND, 'Semester is already exits');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
