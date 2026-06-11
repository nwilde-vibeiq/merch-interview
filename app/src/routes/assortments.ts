import { Router } from 'express';
import { getAssortment, getItemsForAssortment, listAssortments } from '../data/store.js';

export const assortmentsRouter = Router();

assortmentsRouter.get('/', (_req, res) => {
  res.json(listAssortments());
});

assortmentsRouter.get('/:assortmentId', (req, res) => {
  const assortment = getAssortment(req.params.assortmentId);
  if (!assortment) {
    return res.status(404).json({ error: `Assortment '${req.params.assortmentId}' not found` });
  }
  res.json(assortment);
});

assortmentsRouter.get('/:assortmentId/items', (req, res) => {
  const items = getItemsForAssortment(req.params.assortmentId);
  if (!items) {
    return res.status(404).json({ error: `Assortment '${req.params.assortmentId}' not found` });
  }
  res.json(items);
});
