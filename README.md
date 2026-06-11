# Merch Planning API

A small API used by our merchandising team to manage seasonal assortments. An **assortment** is a curated collection of **items** (products) for a season. Each item carries pricing and the number of units shipped to retail.

## Project layout

```
app/                # The API you'll be working in (Express + TypeScript)
mock-retailpulse/   # Local stand-in for RetailPulse, a third-party retail analytics vendor
VENDOR_API.md       # RetailPulse API documentation
```

> **Ground rule:** treat `mock-retailpulse/` as a hosted third-party service. Don't read or modify its source — everything you need to know about it is in [VENDOR_API.md](VENDOR_API.md). You're welcome to call it directly (curl, etc.).

## Setup

Requires Node 20+.

```bash
npm install

# Terminal 1 — the vendor API (port 4100)
npm run dev:mock

# Terminal 2 — the merch API (port 3000)
npm run dev:app

# Run tests
npm test
```

## Existing endpoints

| Endpoint | Description |
| --- | --- |
| `GET /items` | List all items |
| `GET /items/:itemId` | Get one item |
| `GET /assortments` | List all assortments |
| `GET /assortments/:assortmentId` | Get one assortment |
| `GET /assortments/:assortmentId/items` | Items in an assortment |

## Your task: sell-through report

The merch team wants to see how each assortment is performing at retail. **RetailPulse** aggregates point-of-sale data from our retail partners; their API is documented in [VENDOR_API.md](VENDOR_API.md). The mock runs locally on port 4100, and the base URL is already available as `config.retailPulseBaseUrl`.

Build a new endpoint:

```
GET /assortments/:assortmentId/sell-through
```

For each item in the assortment, fetch its sales records from RetailPulse and aggregate them. The response should look roughly like:

```json
{
  "assortmentId": "ast-100",
  "assortmentName": "Spring '26 Core",
  "items": [
    {
      "itemId": "itm-001",
      "sku": "SKU-TEE-001",
      "name": "Coastal Graphic Tee",
      "unitsShipped": 480,
      "unitsSold": 66,
      "grossRevenue": 1979.34,
      "sellThroughRate": 0.138
    }
  ],
  "totals": {
    "unitsShipped": 1830,
    "unitsSold": 215,
    "grossRevenue": 10857.85,
    "sellThroughRate": 0.117
  }
}
```

Where:

- `unitsSold` — sum of sale quantities for the item's SKU
- `grossRevenue` — sum of sale amounts
- `sellThroughRate` — `unitsSold / unitsShipped`
- `totals` — the same aggregates across the whole assortment

The exact shape is yours to refine — be ready to explain your choices.

Things to consider:

- An unknown assortment should return a 404.
- Some items may not have a sales feed at RetailPulse (the vendor returns a 404 for that SKU). Decide how the report should represent that.
- If RetailPulse is unreachable or erroring, the endpoint shouldn't hang or pretend the data is fine.

## What we care about

Working code first, then: clear structure (where does vendor integration code live?), sensible error handling, and how you verify your work. Tests are a plus if time allows, not a requirement.
