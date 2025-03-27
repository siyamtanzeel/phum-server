export type TAcademicSemesterNames = 'Summer' | 'Fall' | 'Autumn';
export type TAcademicSemesterCodes = '01' | '02' | '03';
export type TAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcademicSemesterCodesMapper = {
  [key: string]: string;
};

type TAcademicSemester = {
  name: TAcademicSemesterNames;
  code: TAcademicSemesterCodes;
  year: string;
  startMonth: TAcademicSemesterMonths;
  endMonth: TAcademicSemesterMonths;
};
export default TAcademicSemester;
