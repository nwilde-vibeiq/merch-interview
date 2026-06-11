import express from 'express';
import { SALES_BY_SKU } from './sales-data.js';

const PORT = Number(process.env.PORT ?? 4100);
const PAGE_SIZE = 5;

let apiVersion: 1 | 2 = 1;

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[retailpulse] ${req.method} ${req.originalUrl}`);
  next();
});

function encodeToken(offset: number): string {
  return Buffer.from(`offset:${offset}`).toString('base64url');
}

function decodeToken(token: string): number | null {
  const decoded = Buffer.from(token, 'base64url').toString('utf8');
  const match = /^offset:(\d+)$/.exec(decoded);
  return match ? Number(match[1]) : null;
}

app.get('/v1/sales', (req, res) => {
  const sku = req.query.sku;
  if (typeof sku !== 'string' || sku.length === 0) {
    return res.status(400).json({ error: "Missing required query parameter 'sku'" });
  }

  const records = SALES_BY_SKU[sku];
  if (!records) {
    return res.status(404).json({ error: `No sales feed configured for sku '${sku}'` });
  }

  if (apiVersion === 1) {
    return res.json({ sku, records });
  }

  let offset = 0;
  const pageToken = req.query.page_token;
  if (typeof pageToken === 'string' && pageToken.length > 0) {
    const decoded = decodeToken(pageToken);
    if (decoded === null) {
      return res.status(400).json({ error: "Invalid 'page_token'" });
    }
    offset = decoded;
  }

  const page = records.slice(offset, offset + PAGE_SIZE);
  const nextOffset = offset + PAGE_SIZE;
  res.json({
    sku,
    records: page,
    next_page_token: nextOffset < records.length ? encodeToken(nextOffset) : null,
  });
});

app.get('/__admin/config', (_req, res) => {
  res.json({ apiVersion, pageSize: apiVersion === 2 ? PAGE_SIZE : null });
});

app.post('/__admin/config', (req, res) => {
  const requested = req.body?.apiVersion;
  if (requested !== 1 && requested !== 2) {
    return res.status(400).json({ error: "Body must be { \"apiVersion\": 1 | 2 }" });
  }
  apiVersion = requested;
  console.log(`[retailpulse] *** apiVersion switched to ${apiVersion} ***`);
  res.json({ apiVersion });
});

app.listen(PORT, () => {
  console.log(`RetailPulse mock listening on http://localhost:${PORT} (apiVersion ${apiVersion})`);
});
