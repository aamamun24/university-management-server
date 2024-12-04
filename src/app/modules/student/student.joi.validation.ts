import Joi from 'joi';

// Joi validation for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': '*{#label}* must be capitalized',
      'string.max': '*{#label}* cannot exceed 20 characters',
    }),
  middleName: Joi.string().allow(''), // Optional
  lastName: Joi.string().required().alphanum().messages({
    'string.alphanum': '*{#label}* must contain only alphabet characters',
  }),
});

// Joi validation for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid father contact number format',
    }),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid mother contact number format',
    }),
});

// Joi validation for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid local guardian contact number format',
    }),
  address: Joi.string().required(),
});

// Joi validation for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '*{#label}* must be male, female, or other',
  }),
  dob: Joi.date()
    .iso()
    .messages({ 'date.format': 'Invalid date format (ISO 8601 required)' }),
  email: Joi.string().email().required(),
  contactNo: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required(),
  emergencyContact: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'AB+',
    'AB-',
    'B+',
    'B-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().allow(''),
  isActive: Joi.boolean().default(true),
});

export default studentValidationSchema;
