import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';

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
];

moduleRoutes.forEach((route: TModuleRoute) => {
  router.use(route.path, route.route);
});
export const AppRoutes = router;
