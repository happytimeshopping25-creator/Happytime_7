# Mobile API Reference

This document describes the server-side API layer exposed under `/api/mobile/*`. The
endpoints are designed specifically for the mobile application and provide
pre-aggregated data together with secure access controls.

## Authentication

All mobile endpoints require a **service key** that is mapped to a role. Keys are
configured through the `MOBILE_API_SERVICE_KEYS` environment variable using the
format:

```
MOBILE_API_SERVICE_KEYS="reader:public-mobile-key,payments:mobile-payments-key"
```

* Multiple keys can be supplied by separating entries with commas.
* Each entry must be `role:key`.
* Roles are compared case-sensitively.

### Roles

| Role      | Description                                      | Used By                                |
|-----------|--------------------------------------------------|----------------------------------------|
| `reader`  | Read access to catalog and content endpoints.    | `GET /api/mobile/products`, `GET /api/mobile/content` |
| `payments`| Permission to execute Stripe payment operations. | `POST /api/mobile/stripe/payment-intent` |

Clients must send the key via the `Authorization` header. The API accepts either a
raw key value or a Bearer token.

```
Authorization: Bearer public-mobile-key
```

If the header is missing, malformed, or does not map to the required role the API
responds with `401 Unauthorized` or `403 Forbidden`.

## Endpoints

### `GET /api/mobile/products`

Returns a paginated list of published products sourced from Firestore.

#### Query Parameters

| Name    | Type   | Default | Description |
|---------|--------|---------|-------------|
| `limit` | number | `20`    | Number of products to return. Capped at `50`. |
| `after` | string | —       | ISO timestamp for pagination. Supply the `paging.nextCursor` value from the previous response. |

#### Response

```jsonc
{
  "products": [
    {
      "id": "product-id",
      "title": "Serene Oud",
      "description": "Warm oriental fragrance",
      "price": 35.5,
      "currency": "USD",
      "images": ["https://.../primary.jpg"],
      "tags": ["new"],
      "inventory": 42,
      "createdAt": "2024-05-02T10:15:00.000Z",
      "updatedAt": "2024-05-10T08:21:11.000Z"
    }
  ],
  "paging": {
    "nextCursor": "2024-05-01T11:00:00.000Z",
    "hasMore": true
  }
}
```

### `GET /api/mobile/content`

Provides curated content blocks from Firebase Data Connect collections. The endpoint
transforms the data into a mobile-friendly structure that includes hero content and
lightweight previews of each collection.

#### Query Parameters

| Name  | Type   | Default | Description |
|-------|--------|---------|-------------|
| `page`| string | `home`  | Collection page handle to load. |

#### Response

```jsonc
{
  "page": "home",
  "hero": {
    "title": "O24 Collection",
    "description": "Signature winter picks",
    "image": "https://.../hero.jpg",
    "collectionHandle": "o24-collection"
  },
  "collections": [
    {
      "id": "collection-id",
      "handle": "o24-collection",
      "name": "O24 Collection",
      "description": "Signature winter picks",
      "page": "home",
      "featuredImage": "https://.../hero.jpg",
      "products": [
        {
          "id": "product-id",
          "title": "Serene Oud",
          "handle": "serene-oud",
          "description": "Warm oriental fragrance",
          "price": 35.5,
          "image": "https://.../product.jpg",
          "options": [{ "name": "Size", "value": "100ml" }]
        }
      ]
    }
  ],
  "featuredCollections": [
    {
      "id": "collection-id",
      "handle": "mist-collection",
      "name": "Mist Collection",
      "image": "https://.../mist.jpg",
      "sampleProducts": [ /* up to 4 product previews */ ]
    }
  ],
  "generatedAt": "2024-05-02T11:12:30.000Z"
}
```

### `POST /api/mobile/stripe/payment-intent`

Creates a Stripe Payment Intent using the shared checkout helper. This endpoint
requires a key with the `payments` role.

#### Request Body

```jsonc
{
  "amount": 120.25,
  "products": [
    {
      "productId": "prod_123",
      "name": "Serene Oud",
      "price": 35.5,
      "quantity": 2,
      "selectedOption": [
        { "name": "Size", "value": "100ml" }
      ]
    }
  ],
  "customer": {
    "id": "uid_456",
    "email": "customer@example.com",
    "name": "Customer Name",
    "phone": "+96870000000"
  },
  "shippingInfo": {
    "city": "Muscat",
    "country": "OM"
  }
}
```

#### Response

```json
{
  "clientSecret": "pi_123_secret_456"
}
```

#### Error Handling

* `401` – Missing or invalid service key.
* `403` – Key does not grant the `payments` role.
* `400` – Validation issues (e.g., amount ≤ 0 or no products provided).
* `500` – Unexpected Stripe/API errors.

## Testing the API Locally

1. Configure service keys in `.env.local`:
   ```env
   MOBILE_API_SERVICE_KEYS="reader:local-reader-key,payments:local-payments-key"
   ```
2. Start the development server: `npm run dev`.
3. Call the endpoints with `curl`:
   ```bash
   curl -H "Authorization: Bearer local-reader-key" http://localhost:3000/api/mobile/products
   ```

## Mobile Client Guidance

* Store service keys securely within the mobile app (e.g., via secure storage or
  remote config) and rotate them when possible.
* Always use HTTPS when calling the API.
* Cache content responses where appropriate and rely on `paging.nextCursor` for
  incremental product loading.
