# RetailPulse API

RetailPulse aggregates point-of-sale transactions from retail partners. In this project a local mock of the service runs at `http://localhost:4100`.

Authentication is disabled in the sandbox environment.

## GET /v1/sales

Returns the point-of-sale records for a single SKU.

### Query parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `sku` | yes | The product SKU to fetch sales for |

### Example

```bash
curl 'http://localhost:4100/v1/sales?sku=SKU-CAP-004'
```

```json
{
  "sku": "SKU-CAP-004",
  "records": [
    {
      "sale_id": "SKU-CAP-004-S001",
      "sold_at": "2026-04-01T00:00:00Z",
      "store": { "id": "ST-04", "name": "SoHo Flagship" },
      "quantity": 1,
      "net_amount": 19.99
    }
  ]
}
```

### Record fields

| Field | Type | Description |
| --- | --- | --- |
| `sale_id` | string | Unique transaction id |
| `sold_at` | string | ISO 8601 timestamp of the sale |
| `store` | object | `{ id, name }` of the retail location |
| `quantity` | number | Units sold in the transaction |
| `net_amount` | number | Transaction amount in USD |

### Errors

| Status | Meaning |
| --- | --- |
| `400` | Missing or invalid `sku` parameter |
| `404` | No sales feed is configured for this SKU |

A SKU with a configured feed but no transactions yet returns `200` with an empty `records` array.
