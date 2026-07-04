# 🧪 Testing - Agent IA E-Commerce

## Setup Jest

```bash
npm install --save-dev jest supertest @types/jest
```

## Run Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Test Examples

### Test Shopify API
```javascript
const ShopifyAPI = require('../integrations/shopify-api');

describe('ShopifyAPI', () => {
  let shopify;

  beforeEach(() => {
    shopify = new ShopifyAPI();
  });

  test('should get products', async () => {
    const products = await shopify.getProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  test('should create product', async () => {
    const product = await shopify.createProduct({
      title: 'Test Product',
      handle: 'test-product',
      bodyHtml: 'Test',
    });
    expect(product.id).toBeDefined();
  });
});
```

### Test Analytics
```javascript
const SalesAnalyzer = require('../agent-core/analyzer');

describe('SalesAnalyzer', () => {
  let analyzer;

  beforeEach(() => {
    analyzer = new SalesAnalyzer();
  });

  test('should analyze daily sales', async () => {
    const analysis = await analyzer.analyzeDailySales('2024-01-01');
    expect(analysis.metrics).toBeDefined();
    expect(analysis.insights).toBeDefined();
  });
});
```

### Test API Endpoints
```javascript
const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  test('GET /health should return online', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('online');
  });

  test('GET /api/shopify/products', async () => {
    const response = await request(app).get('/api/shopify/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

## Performance Benchmarks

- API Response: < 200ms
- Database Query: < 100ms
- AI Response: < 2000ms
- Order Processing: < 5000ms

---