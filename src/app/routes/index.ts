import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = Router();

type TModuleRoute = {
  path: string;
  route: Router;
};
const moduleRoutes: TModuleRoute[] = [
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },
];

moduleRoutes.forEach((route: TModuleRoute) => {
  router.use(route.path, route.route);
});
export const AppRoutes = router;
