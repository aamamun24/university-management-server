import { z } from 'zod';

// Zod schema for userName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(20, 'First name cannot exceed 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only alphabet characters'),
});

// Zod schema for guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid contact number format'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid contact number format'),
});

// Zod schema for localGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z
    .string()
    .min(1, 'Local guardian contact number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid contact number format'),
  address: z.string().min(1, 'Local guardian address is required'),
});

// Zod schema for student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, 'Password at least 6 characters').max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['female', 'male', 'other'], {
        errorMap: () => ({ message: 'Gender must be male, female, or other' }),
      }),
      dob: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      contactNo: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid contact number format')
        .min(1, 'Contact number is required'),
      emergencyContact: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid emergency contact number format')
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().url().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
