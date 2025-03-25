import { ErrorRequestHandler, json } from 'express';
import status from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Oops! Something went wrong',
    error: err,
  });
};
export default globalErrorHandler;
