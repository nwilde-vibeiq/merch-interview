import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('items', () => {
  it('lists all items', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(6);
  });

  it('gets a single item', async () => {
    const res = await request(app).get('/items/itm-001');
    expect(res.status).toBe(200);
    expect(res.body.sku).toBe('SKU-TEE-001');
  });

  it('returns 404 for an unknown item', async () => {
    const res = await request(app).get('/items/itm-999');
    expect(res.status).toBe(404);
  });
});

describe('assortments', () => {
  it('lists all assortments', async () => {
    const res = await request(app).get('/assortments');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('gets the items in an assortment', async () => {
    const res = await request(app).get('/assortments/ast-100/items');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
    expect(res.body[0].sku).toBe('SKU-TEE-001');
  });

  it('returns 404 for an unknown assortment', async () => {
    const res = await request(app).get('/assortments/ast-999');
    expect(res.status).toBe(404);
  });
});
