import { Request, Response } from 'express';
import { addEntry, getUserEntries, getEntry, editEntry, removeEntry } from '../services/entryService';

export const createEntry = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const entry = await addEntry({ ...req.body, userId: req.user.userId });
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    else {
      const entries = await getUserEntries(req.user.userId);
      res.json(entries);
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getEntryById = async (req: Request, res: Response) => {
  try {
    const entry = await getEntry(parseInt(req.params.id));
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateEntryById = async (req: Request, res: Response) => {
  try {
    const entry = await editEntry({ ...req.body, id: parseInt(req.params.id) });
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteEntryById = async (req: Request, res: Response) => {
  try {
    const entry = await removeEntry(parseInt(req.params.id));
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
