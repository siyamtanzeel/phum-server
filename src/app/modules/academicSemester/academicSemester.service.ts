import { academicSemesterCodesMapper } from './academicSemester.constants';
import TAcademicSemester from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDB = async (
  academicSemester: TAcademicSemester,
) => {
  const result = await AcademicSemester.create(academicSemester);
  return result;
};
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  if (!result) {
    throw new Error('No semester found!');
  }
  return result;
};
const updateSemesterInDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const targetSemester = await AcademicSemester.findById(id);
  if (Object.keys(payload).length == 0) {
    throw new Error('No fields sent for update!');
  }
  if (
    academicSemesterCodesMapper[targetSemester?.name as string] !== payload.code
  ) {
    throw new Error('Invalid academic semester name and code combination');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateSemesterInDB,
};
