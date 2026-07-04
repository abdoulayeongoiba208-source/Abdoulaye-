# 🚀 QUICKSTART - Agent IA E-Commerce

## ⚡ 30 Secondes pour Démarrer

```bash
# 1. Clone et installation
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
npm install

# 2. Configuration
cp config/credentials.env.example config/credentials.env
# ✏️ Éditer config/credentials.env avec vos API keys

# 3. Démarrer
npm run dev
```

## 📊 Accès

- **API**: http://localhost:3000
- **Health**: http://localhost:3000/health
- **Dashboard**: http://localhost:3000/dashboard

## 🔑 API Keys Requis

### Shopify
1. Aller sur: https://admin.shopify.com
2. Apps > App and sales channel settings
3. Créer une application custom
4. Copier le token d'accès

### OpenAI
1. Aller sur: https://platform.openai.com
2. API keys > Create new secret key
3. Copier la clé

### Twilio (WhatsApp)
1. Aller sur: https://www.twilio.com
2. Console > Messaging > Try it out
3. Copier Account SID, Auth Token

### Alibaba
1. Créer compte: https://www.alibabacloud.com
2. Ou utiliser AliExpress API
3. Copier API Key & Secret

## 📝 Fichier .env Exemple

```env
# Shopify
SHOPIFY_STORE_NAME=my-store
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Alibaba
ALIBABA_API_KEY=xxxxx
ALIBABA_API_SECRET=xxxxx

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

## 🧪 Test les Endpoints

```bash
# Health Check
curl http://localhost:3000/health

# Get Products
curl http://localhost:3000/api/shopify/products

# Analyze Daily Sales
curl http://localhost:3000/api/analytics/daily

# Get Trending Products
curl http://localhost:3000/api/predictions/trending
```

## 🎯 Cas d'Usage Rapides

### 1️⃣ Obtenir Analyse Ventes
```javascript
fetch('http://localhost:3000/api/analytics/daily')
  .then(r => r.json())
  .then(data => console.log(data.metrics))
```

### 2️⃣ Chercher Produits Alibaba
```javascript
fetch('http://localhost:3000/api/alibaba/search?keyword=phone')
  .then(r => r.json())
  .then(products => console.log(products))
```

### 3️⃣ Envoyer Message WhatsApp
```javascript
fetch('http://localhost:3000/api/whatsapp/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+212612345678',
    message: '🎁 20% discount on electronics! Use code: SALE20'
  })
})
```

### 4️⃣ Optimiser Prix
```javascript
fetch('http://localhost:3000/api/optimizer/prices', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    demandScore: 0.8,
    competitionCount: 5
  })
})
```

## 📊 Dashboard Features

- ✅ Ventes temps réel
- ✅ Produits tendance
- ✅ Optimisation prix
- ✅ Performance régions
- ✅ Recherche Alibaba
- ✅ WhatsApp Bot

## 🐛 Troubleshooting

### Erreur: Port 3000 déjà utilisé
```bash
# Utiliser port différent
PORT=3001 npm run dev
```

### Erreur: MongoDB connection refused
```bash
# Vérifier MongoDB
mongod

# Ou utiliser MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Erreur: Redis connection refused
```bash
# Vérifier Redis
redis-server
```

### Erreur: API Key invalid
- Vérifier que la clé est correcte dans .env
- Vérifier que les permissions sont activées
- Régénérer la clé si nécessaire

## 🚀 Production Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku logs --tail
```

### Docker
```bash
docker build -t ecommerce-ai .
docker run -p 3000:3000 -e NODE_ENV=production ecommerce-ai
```

### AWS/GCP
Voir `/docs/deployment.md`

## 📚 Documentation Complète

- [Installation](docs/INSTALLATION.md) - Détails complets
- [Architecture](docs/ARCHITECTURE.md) - Design système
- [API Reference](docs/API.md) - Tous les endpoints

## 💡 Tips

1. **Dashboard**: Accéder à http://localhost:3000/dashboard
2. **Real-time**: WebSockets activés automatiquement
3. **Logging**: Voir logs dans console
4. **Database**: Données persistées dans MongoDB
5. **Cache**: Redis pour performance

## 🆘 Support

- 📧 Email: support@example.com
- 🐛 Issues: GitHub Issues
- 💬 Chat: Discord

## 🎉 C'est Parti!

```bash
# Démarrer le serveur
npm run dev

# Ouvrir Dashboard
open http://localhost:3000/dashboard

# Commencer à vendre! 🚀
```

---

**Prêt à transformer votre e-commerce? 💎**