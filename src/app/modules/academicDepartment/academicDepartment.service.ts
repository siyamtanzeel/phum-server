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
  const departmentCount = await AcademicDepartment.countDocuments({
    academicFaculty: academicFaculty._id,
  });
  const academicDepartment = {
    name: payload.name,
    code:
      departmentCount < 9
        ? '0' + (departmentCount + 1).toString()
        : (departmentCount + 1).toString(),
    academicFaculty: academicFaculty!._id,
  };

  const result = (await AcademicDepartment.create(academicDepartment)).populate(
    'academicFaculty',
  );
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
};
