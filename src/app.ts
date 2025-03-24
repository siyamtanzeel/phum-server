import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { studentRoutes } from './app/modules/student/student.route';
import { AppRoutes } from './app/routes';

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
export default app;
