import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { studentRoutes } from './app/modules/student/student.route';
import { AppRoutes } from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*' }));

//middlewares

//application routes
app.use('/api/v1', AppRoutes);
//routes
app.get('/', (req: Request, res: Response) => {
  res.send('App is running');
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);
export default app;
