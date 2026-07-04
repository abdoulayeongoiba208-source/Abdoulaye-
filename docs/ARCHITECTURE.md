# 🏗️ Architecture - Agent IA E-Commerce

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│  Dashboard / Mobile App / WhatsApp / Shopify              │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY                              │
│  Express.js / REST / WebSockets (Socket.io)               │
└────────────┬────────────────────────────────────────────────┘
             │
    ┌────────┼────────┬──────────────┬────────────┐
    │        │        │              │            │
    ▼        ▼        ▼              ▼            ▼
┌───────┐ ┌──────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
│AGENT  │ │AUTH  │ │REQUEST   │ │RATE     │ │LOGGING   │
│CORE   │ │      │ │VALIDATOR │ │LIMIT    │ │          │
└───┬───┘ └──────┘ └──────────┘ └─────────┘ └──────────┘
    │
    ├─────────────┬──────────────┬─────────────┐
    │             │              │             │
    ▼             ▼              ▼             ▼
┌────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐
│ANALYZER│  │PREDICTOR│  │OPTIMIZER │  │CORE ML   │
│        │  │         │  │          │  │ Engine   │
└────────┘  └─────────┘  └──────────┘  └──────────┘
    │             │              │             │
    └─────────────┼──────────────┼─────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  DATA LAYER     │
         │                 │
         │ ┌─────────────┐ │
         │ │ MongoDB     │ │
         │ └─────────────┘ │
         │ ┌─────────────┐ │
         │ │ Redis Cache │ │
         │ └─────────────┘ │
         │ ┌─────────────┐ │
         │ │ Bull Queues │ │
         │ └─────────────┘ │
         └─────────────────┘
```

## Modules Principaux

### 🧠 Agent Core (`/agent-core`)

**Analyzer** - Analyse données temps réel
- Streaming ventes
- Calcul métriques
- Génération insights IA
- Export rapports

**Predictor** - ML & Prédictions
- TensorFlow.js pour LSTM
- Forecast séries temporelles
- Classification produits
- Scoring élasticité

**Optimizer** - Optimisations automatiques
- Pricing dynamique
- Inventory levels
- Descriptions SEO
- Recommandations bundles

### 🔗 Integrations (`/integrations`)

**ShopifyAPI**
- Produits CRUD
- Commandes stream
- Inventory sync
- Webhooks realtime

**AlibabaAPI**
- Recherche produits
- Price comparison
- Supplier validation
- Trending detection

**WhatsAppBot**
- Chat conversations
- AI responses
- Order processing
- Customer support

### ⚙️ Automation (`/automation`)

**OrderProcessor**
- Queue management (Bull)
- Order validation
- Supplier routing
- Tracking generation

**InventorySync**
- Cron jobs (node-cron)
- Stock optimization
- Reorder automation
- Sync Shopify↔Database

**MarketingEngine**
- Campaign generation
- Email templates
- A/B testing
- Recommendation engine

## Flows Principaux

### Flow 1: Customer Purchase

```
1. Client commande sur Shopify
   ↓
2. Webhook → Server
   ↓
3. OrderProcessor queue
   ↓
4. Validation + Check inventory
   ↓
5. Send to Alibaba supplier
   ↓
6. Generate tracking
   ↓
7. Update Shopify + notify customer
```

### Flow 2: AI Analysis

```
1. Analyzer scrape Shopify data
   ↓
2. Calculate metrics (revenue, AOV, etc)
   ↓
3. Generate AI insights (OpenAI)
   ↓
4. Store in MongoDB
   ↓
5. Emit via Socket.io to Dashboard
```

### Flow 3: Price Optimization

```
1. Optimizer fetches products
   ↓
2. Get market analysis (Alibaba)
   ↓
3. Calculate elasticity
   ↓
4. Predict optimal price (ML)
   ↓
5. Auto-update on Shopify
   ↓
6. Log results in MongoDB
```

### Flow 4: WhatsApp Interaction

```
1. Customer message via WhatsApp
   ↓
2. Twilio webhook → Server
   ↓
3. WhatsAppBot receives message
   ↓
4. Send to OpenAI for understanding
   ↓
5. Generate contextual response
   ↓
6. Send back via Twilio
```

## Database Schema

### Products
```javascript
{
  _id: ObjectId,
  shopifyId: String,
  title: String,
  price: Number,
  cost: Number,
  description: String,
  images: [String],
  category: String,
  inventory: {
    current: Number,
    reorder: Number,
    optimal: Number
  },
  metrics: {
    dailySales: Number,
    roi: Number,
    trend: String
  },
  supplier: {
    alibaba: String,
    price: Number,
    leadTime: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Orders
```javascript
{
  _id: ObjectId,
  shopifyOrderId: String,
  customerId: String,
  items: [{productId, quantity, price}],
  totalPrice: Number,
  status: String,
  supplier: {
    alibabOrderId: String,
    tracking: String
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Analytics
```javascript
{
  _id: ObjectId,
  date: Date,
  metrics: {
    totalRevenue: Number,
    totalOrders: Number,
    avgOrderValue: Number,
    conversionRate: Number,
    topProducts: Array,
    topRegions: Array
  },
  insights: String,
  predictions: Object,
  createdAt: Date
}
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: REST + WebSockets (Socket.io)
- **Language**: JavaScript/ES6+

### Database
- **Primary**: MongoDB
- **Cache**: Redis
- **Queue**: Bull (Redis-backed)

### AI/ML
- **LLM**: OpenAI GPT-4
- **ML**: TensorFlow.js
- **NLP**: OpenAI embeddings

### External APIs
- **E-commerce**: Shopify
- **Sourcing**: Alibaba/AliExpress
- **Messaging**: Twilio

### Utilities
- **HTTP**: Axios
- **Validation**: Joi
- **JWT**: jsonwebtoken
- **Scheduling**: node-cron
- **Logging**: Morgan
- **Security**: Helmet

### Frontend
- **UI**: HTML5/CSS3/JavaScript
- **Real-time**: Socket.io client
- **Charts**: Chart.js

## Scalability Considerations

### Horizontal Scaling
- Load balancer (nginx)
- Multiple server instances
- Distributed queue (Bull with Redis)
- Session storage (Redis)

### Vertical Scaling
- Database indexing
- Query optimization
- Caching strategy
- Connection pooling

### Performance
- CDN for static assets
- Image optimization
- API rate limiting
- Request compression

## Security

- JWT authentication
- HTTPS/TLS encryption
- Environment variables
- Input validation (Joi)
- SQL injection prevention
- CORS configuration
- Rate limiting
- Helmet security headers

---

**Architecture Version 1.0 - Last Updated: 2024**