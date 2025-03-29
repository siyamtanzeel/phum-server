import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import TAcademicDepartment from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: any) => {
  const academicFaculty = await AcademicFaculty.findOne({
    name: payload.academicFaculty,
  });
  if (!academicFaculty) {
    throw new Error('Invalid Academic Faculty');
  }
  const academicDepartment = {
    name: payload.name,
    academicFaculty: academicFaculty!._id,
  };

  const result = await AcademicDepartment.create(academicDepartment);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
};
