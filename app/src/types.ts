export interface Item {
  id: string;
  sku: string;
  name: string;
  color: string;
  wholesalePrice: number;
  retailPrice: number;
  unitsShipped: number;
}

export interface Assortment {
  id: string;
  name: string;
  season: string;
  itemIds: string[];
}
