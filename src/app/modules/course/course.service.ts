import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...courseRemaining } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // step 1: basic course info update

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaining,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update course');
    }

    // check if preRequisiteCourses is present in the payload
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted preRequisiteCourses
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, session, runValidators: true },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(status.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new preRequisiteCourses
      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const updatedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisites },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!updatedPreRequisiteCourses) {
        throw new AppError(status.BAD_REQUEST, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesIntoCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesIntoCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
