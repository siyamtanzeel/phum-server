import dotenv from 'dotenv';
import path from 'path';
import { cwd } from 'process';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URI,
};
