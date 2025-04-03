import { Schema, Types, model } from 'mongoose';
import {
  TName,
  TGuardian,
  TLocalGuardian,
  TStudent,
  studentModel,
  TStudentMethods,
} from './student.interface';

// Schema for TName
const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false, // Optional as per the ? in the interface
  },
  lastName: {
    type: String,
    required: true,
  },
});

// Schema for TGuardian
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
});

// Schema for TLocalGuardian
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

// Schema for TStudent
const studentSchema = new Schema<TStudent, studentModel, TStudentMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: [true, 'Student ID already exists!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: [true, 'User ID already exists!'],
      ref: 'User',
    },
    name: {
      type: nameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'Blood Group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Semester is required'],
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department is required'],
      ref: 'AcademicDepartment',
    },
    profileImage: {
      type: String,
      required: [true, 'Profile image is required'], // Could be optional if preferred
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active', // Default value added for practicality
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

//creating static method for checking if student exists
studentSchema.method('studentExists', async function (id: string) {
  const existingUser = await this.model('Student').findOne({ id });
  return !!existingUser; // Return a boolean
});

// Create and export the Mongoose model
export const Student = model<TStudent, studentModel>('Student', studentSchema);
