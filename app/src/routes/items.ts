import { Router } from 'express';
import { getItem, listItems } from '../data/store.js';

export const itemsRouter = Router();

itemsRouter.get('/', (_req, res) => {
  res.json(listItems());
});

itemsRouter.get('/:itemId', (req, res) => {
  const item = getItem(req.params.itemId);
  if (!item) {
    return res.status(404).json({ error: `Item '${req.params.itemId}' not found` });
  }
  res.json(item);
});
