import pool from '../utils/db';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const createUser = async (user: User) => {
  const { username, email, password } = user;
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserByid = async (id: number) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [id]);
    return result.rows[0];
  };