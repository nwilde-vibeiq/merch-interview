import { Assortment, Item } from '../types.js';

const items = new Map<string, Item>(
  (
    [
      {
        id: 'itm-001',
        sku: 'SKU-TEE-001',
        name: 'Coastal Graphic Tee',
        color: 'Sea Glass',
        wholesalePrice: 12.5,
        retailPrice: 29.99,
        unitsShipped: 480,
      },
      {
        id: 'itm-002',
        sku: 'SKU-HOOD-002',
        name: 'Harbor Fleece Hoodie',
        color: 'Storm Navy',
        wholesalePrice: 24.0,
        retailPrice: 59.99,
        unitsShipped: 320,
      },
      {
        id: 'itm-003',
        sku: 'SKU-PANT-003',
        name: 'Metro Pant',
        color: 'Black',
        wholesalePrice: 27.5,
        retailPrice: 69.99,
        unitsShipped: 600,
      },
      {
        id: 'itm-004',
        sku: 'SKU-CAP-004',
        name: 'Boardwalk Cap',
        color: 'Khaki',
        wholesalePrice: 6.5,
        retailPrice: 19.99,
        unitsShipped: 250,
      },
      {
        id: 'itm-005',
        sku: 'SKU-DRESS-005',
        name: 'Solstice Midi Dress',
        color: 'Terracotta',
        wholesalePrice: 31.0,
        retailPrice: 79.99,
        unitsShipped: 180,
      },
      {
        id: 'itm-006',
        sku: 'SKU-SCARF-006',
        name: 'Drift Scarf',
        color: 'Multi',
        wholesalePrice: 9.0,
        retailPrice: 24.99,
        unitsShipped: 120,
      },
    ] satisfies Item[]
  ).map((item) => [item.id, item]),
);

const assortments = new Map<string, Assortment>(
  (
    [
      {
        id: 'ast-100',
        name: "Spring '26 Core",
        season: 'Spring 2026',
        itemIds: ['itm-001', 'itm-002', 'itm-003', 'itm-004', 'itm-005'],
      },
      {
        id: 'ast-200',
        name: "Spring '26 Boutique Capsule",
        season: 'Spring 2026',
        itemIds: ['itm-003', 'itm-005', 'itm-006'],
      },
    ] satisfies Assortment[]
  ).map((assortment) => [assortment.id, assortment]),
);

export function listItems(): Item[] {
  return [...items.values()];
}

export function getItem(id: string): Item | undefined {
  return items.get(id);
}

export function listAssortments(): Assortment[] {
  return [...assortments.values()];
}

export function getAssortment(id: string): Assortment | undefined {
  return assortments.get(id);
}

export function getItemsForAssortment(assortmentId: string): Item[] | undefined {
  const assortment = assortments.get(assortmentId);
  if (!assortment) return undefined;
  return assortment.itemIds
    .map((itemId) => items.get(itemId))
    .filter((item): item is Item => item !== undefined);
}
