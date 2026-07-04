# 🚀 Guide d'Installation - Agent IA E-Commerce

## 📋 Prérequis

- Node.js v16+
- npm ou yarn
- MongoDB local ou Atlas
- Redis
- Comptes APIs:
  - Shopify
  - OpenAI
  - Twilio
  - Alibaba/AliExpress

## 🔧 Installation Pas à Pas

### 1️⃣ Clone et Installation

```bash
# Clone le repository
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-

# Install dependencies
npm install
```

### 2️⃣ Configuration Environment

```bash
# Copier le template
cp config/credentials.env.example config/credentials.env

# Éditer avec vos APIs
nano config/credentials.env
```

Remplir les valeurs:

```env
# Shopify
SHOPIFY_STORE_NAME=votre-store
SHOPIFY_ACCESS_TOKEN=shpat_xxxx

# OpenAI
OPENAI_API_KEY=sk-xxxx

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
TWILIO_PHONE_NUMBER=+1234567890

# Alibaba
ALIBABA_API_KEY=xxxx
ALIBABA_API_SECRET=xxxx

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development
```

### 3️⃣ Database Setup

```bash
# MongoDB
mongod

# Redis
redis-server
```

### 4️⃣ Démarrer le Serveur

```bash
# Développement
npm run dev

# Production
npm run start
```

## 🌐 Accès

- **API**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Health Check**: http://localhost:3000/health

## 📡 Endpoints Principaux

### 📊 Analytics

```bash
GET /api/analytics/daily?date=2024-01-01
GET /api/analytics/products
GET /api/analytics/regions
```

### 🎯 Predictions

```bash
GET /api/predictions/trending
POST /api/predictions/price-optimal
```

### 💰 Optimizer

```bash
POST /api/optimizer/prices
POST /api/optimizer/inventory
```

### 🛍️ Shopify

```bash
GET /api/shopify/products
GET /api/shopify/orders
POST /api/shopify/products (create)
```

### 📦 Alibaba

```bash
GET /api/alibaba/search?keyword=phone
GET /api/alibaba/trending?category=electronics
POST /api/alibaba/compare-prices
```

### 💬 WhatsApp

```bash
POST /api/whatsapp/send
POST /api/whatsapp/handle-message
POST /api/whatsapp/product-inquiry
```

## 🧪 Tests

```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

## 🚀 Deployment

### Heroku

```bash
# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# Logs
heroku logs --tail
```

### Docker

```bash
# Build
docker build -t ecommerce-ai .

# Run
docker run -p 3000:3000 -e NODE_ENV=production ecommerce-ai
```

## 🐛 Troubleshooting

### Error: ECONNREFUSED (MongoDB)

```bash
# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
```

### Error: Redis Connection

```bash
# Start Redis
redis-server

# Or check Redis is on correct port
REDIS_PORT=6379
```

### API Key Errors

- Vérifier que tous les .env sont corrects
- Tester chaque API individuellement
- Consulter les logs du serveur

## 📚 Documentation Supplémentaire

- [API Documentation](/docs/api.md)
- [Architecture](/docs/architecture.md)
- [Cas d'usage](/docs/use-cases.md)
- [Deployment Guide](/docs/deployment.md)

## 💡 Tips

1. **Rate Limiting**: Shopify et Alibaba ont des limites. Gérer les queues avec Bull.
2. **Caching**: Utiliser Redis pour les données fréquentes.
3. **Monitoring**: Ajouter Sentry pour les erreurs.
4. **Logging**: Winston pour les logs structurés.

## 🆘 Support

Pour toute question: contact@example.com

---

**Prêt à transformer votre e-commerce? 🚀**