import TAcademicFaculty from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (
  payload: Partial<TAcademicFaculty>,
) => {
  const facultyCount = await AcademicFaculty.countDocuments();
  payload.code =
    facultyCount < 9
      ? '0' + (facultyCount + 1).toString()
      : (facultyCount + 1).toString();
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
};
