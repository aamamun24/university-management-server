import { Router } from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequest(CourseValidations.facultiesToCourseValidationSchema),
  CourseControllers.assignFacultiesIntoCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidations.facultiesToCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

export const CourseRoutes = router;
