import { RequestHandler } from 'express';
import status from 'http-status';

const notFound: RequestHandler = (req, res) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    error: '',
  });
};
export default notFound;
