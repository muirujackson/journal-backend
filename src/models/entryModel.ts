import pool from '../utils/db';

export type Entry = {
  id?: number;
  title: string;
  content: string;
  category: string;
  date: Date;
  userId: number;
};

export const createEntry = async (entry: Entry) => {
  const { title, content, category, date, userId } = entry;
  const result = await pool.query(
    'INSERT INTO entries (title, content, category, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, content, category, date, userId]
  );
  return result.rows[0];
};

export const getEntriesByUser = async (userId: number) => {
  const result = await pool.query('SELECT * FROM entries WHERE user_id = $1', [userId]);
  return result.rows;
};

export const getEntryById = async (entryId: number) => {
  const result = await pool.query('SELECT * FROM entries WHERE id = $1', [entryId]);
  return result.rows[0];
};

export const updateEntry = async (entry: Entry) => {
  const { id, title, content, category, date } = entry;
  const result = await pool.query(
    'UPDATE entries SET title = $1, content = $2, category = $3, date = $4 WHERE id = $5 RETURNING *',
    [title, content, category, date, id]
  );
  return result.rows[0];
};

export const deleteEntry = async (entryId: number) => {
  const result = await pool.query('DELETE FROM entries WHERE id = $1 RETURNING *', [entryId]);
  return result.rows[0];
};
