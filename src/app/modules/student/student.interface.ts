import { Model, Types } from 'mongoose';

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  academicSemester: Types.ObjectId;
  profileImage: string;
  isActive: 'active' | 'blocked';
};

export type TStudentMethods = {
  studentExists(id: string): Promise<boolean>;
};

export type studentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
>;
