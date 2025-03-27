import {
  TAcademicSemesterCodes,
  TAcademicSemesterCodesMapper,
  TAcademicSemesterMonths,
  TAcademicSemesterNames,
} from './academicSemester.interface';

export const academicSemesterNames: TAcademicSemesterNames[] = [
  'Summer',
  'Fall',
  'Autumn',
];
export const academicSemesterCodes: TAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];
export const academicSemesterMonths: TAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterCodesMapper: TAcademicSemesterCodesMapper = {
  Summer: '01',
  Fall: '02',
  Autumn: '03',
};
