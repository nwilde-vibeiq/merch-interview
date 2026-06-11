export interface VendorSaleRecord {
  sale_id: string;
  sold_at: string;
  store: { id: string; name: string };
  quantity: number;
  net_amount: number;
}

const STORES = [
  { id: 'ST-04', name: 'SoHo Flagship' },
  { id: 'ST-11', name: 'Venice Beach' },
  { id: 'ST-17', name: 'Chicago Loop' },
  { id: 'ST-23', name: 'Austin Domain' },
];

function buildRecords(sku: string, count: number, unitPrice: number, seed: number): VendorSaleRecord[] {
  const records: VendorSaleRecord[] = [];
  for (let i = 0; i < count; i++) {
    const quantity = ((i * 7 + seed) % 9) + 1;
    const day = ((i * 3) % 28) + 1;
    const month = i % 2 === 0 ? '04' : '05';
    const store = STORES[i % STORES.length];
    records.push({
      sale_id: `${sku}-S${String(i + 1).padStart(3, '0')}`,
      sold_at: `2026-${month}-${String(day).padStart(2, '0')}T00:00:00Z`,
      store,
      quantity,
      net_amount: Number((quantity * unitPrice).toFixed(2)),
    });
  }
  return records;
}

export const SALES_BY_SKU: Record<string, VendorSaleRecord[]> = {
  'SKU-TEE-001': buildRecords('SKU-TEE-001', 14, 29.99, 0),
  'SKU-HOOD-002': buildRecords('SKU-HOOD-002', 9, 59.99, 3),
  'SKU-PANT-003': buildRecords('SKU-PANT-003', 17, 69.99, 5),
  'SKU-CAP-004': buildRecords('SKU-CAP-004', 5, 19.99, 2),
  'SKU-DRESS-005': [],
};
