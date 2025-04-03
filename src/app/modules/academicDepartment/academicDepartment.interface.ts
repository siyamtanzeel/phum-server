import { Types } from 'mongoose';

type TAcademicDepartment = {
  name: string;
  code: string;
  academicFaculty: Types.ObjectId;
};
export default TAcademicDepartment;
