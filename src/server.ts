import app from './app';
import dotenv from 'dotenv';
import pool from './utils/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

pool.connect();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
pool.on('connect', () => {
  console.log('connected to the db');
});