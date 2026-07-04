# 🎓 GUIDE COMPLET D'UTILISATION - Agent IA E-Commerce

## 📍 TABLE DES MATIÈRES

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Démarrage](#démarrage)
4. [Dashboard](#dashboard)
5. [API Usage](#api-usage)
6. [Cas d'Usage Réels](#cas-dusage-réels)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 INSTALLATION

### Étape 1: Télécharger le Code

```bash
# Ouvrir terminal/PowerShell
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
```

**Ou télécharger le ZIP:**
- Aller sur: https://github.com/abdoulayeongoiba208-source/Abdoulaye-
- Cliquer "Code" → "Download ZIP"
- Extraire et ouvrir le dossier

### Étape 2: Installer Node.js

**Sur Windows:**
1. Aller sur: https://nodejs.org
2. Télécharger "LTS"
3. Installer (cliquer Next partout)
4. Redémarrer l'ordinateur

**Sur Mac:**
```bash
brew install node
```

**Sur Linux:**
```bash
sudo apt-get install nodejs npm
```

### Étape 3: Installer les Dépendances

```bash
# Se placer dans le dossier du projet
cd Abdoulaye-

# Installer
npm install

# Ça va prendre 2-5 minutes... patience! ☕
```

---

## ⚙️ CONFIGURATION

### Étape 1: Créer le Fichier .env

```bash
# Copier le fichier template
cp config/credentials.env.example config/credentials.env
```

**Sur Windows (PowerShell):**
```powershell
Copy-Item config\credentials.env.example config\credentials.env
```

### Étape 2: Remplir les API Keys

Ouvrir `config/credentials.env` avec un éditeur (Notepad, VSCode, etc)

#### 🔑 Clé 1: SHOPIFY

```
SHOPIFY_STORE_NAME=ton-store
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
```

**Comment l'obtenir:**
1. Aller sur: https://admin.shopify.com
2. Se connecter à ta boutique
3. Apps → App and sales channel settings
4. Create an app → Créer
5. Configuration → Admin API access scopes
6. Cocher: read_products, write_products, read_orders
7. Install app
8. Copier le "Access token"
9. Coller dans .env

#### 🔑 Clé 2: OPENAI (GPT-4)

```
OPENAI_API_KEY=sk-xxxxx
```

**Comment l'obtenir:**
1. Aller sur: https://platform.openai.com
2. Login ou créer compte
3. API keys → Create new secret key
4. Copier la clé
5. Coller dans .env
6. ⚠️ Ajouter du crédit ($5-20)

#### 🔑 Clé 3: TWILIO (WhatsApp)

```
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

**Comment l'obtenir:**
1. Aller sur: https://www.twilio.com
2. Créer compte gratuit
3. Console → Phone Numbers
4. Get Started with WhatsApp
5. Copier SID, Auth Token, Phone Number
6. Coller dans .env

#### 🔑 Clé 4: MONGODB (Base de Données)

```
MONGODB_URI=mongodb://localhost:27017/ecommerce-ai
```

**Option A: Local (Simple)**
```
MONGODB_URI=mongodb://localhost:27017/ecommerce-ai
```

**Option B: Cloud Atlas (Recommandé)**
1. Aller sur: https://www.mongodb.com/cloud/atlas
2. Créer compte gratuit
3. Create a Cluster
4. Connect → Get connection string
5. Remplacer `username:password`
6. Coller dans .env

### Exemple de .env Rempli

```env
# Shopify
SHOPIFY_STORE_NAME=my-awesome-store
SHOPIFY_ACCESS_TOKEN=shpat_abc123def456

# OpenAI
OPENAI_API_KEY=sk-proj-abc123

# Twilio
TWILIO_ACCOUNT_SID=ACabc123
TWILIO_AUTH_TOKEN=def456
TWILIO_PHONE_NUMBER=+12025551234

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development
```

---

## 🚀 DÉMARRAGE

### Méthode 1: Mode Développement (Simple)

```bash
# Depuis le dossier du projet
npm run dev

# Résultat:
# ✅ Server Running on Port: 3000
# 🌐 Dashboard: http://localhost:3000/dashboard
```

**Puis ouvrir dans ton navigateur:**
```
http://localhost:3000/dashboard
```

### Méthode 2: Docker (Plus Facile)

```bash
# Avoir Docker installé (https://docker.com)
docker-compose up

# Accès:
# API: http://localhost:3000
# Dashboard: http://localhost:3000/dashboard
# MongoDB: http://localhost:8081
```

### Méthode 3: Setup Interactif

```bash
node scripts/setup.js

# Il va demander les API keys et démarrer
```

---

## 📊 DASHBOARD - Comment l'Utiliser

### Accès

Ouvrir dans navigateur:
```
http://localhost:3000/dashboard
```

### Écran Principal

```
┌─────────────────────────────────────────────┐
│  🚀 Agent IA E-Commerce    Status: Online   │
├─────────────────────────────────────────────┤
│  💰 Revenue  │  📦 Orders  │  💻 Customers  │
│  $0          │  0          │  0             │
├─────────────────────────────────────────────┤
│  📈 Charts  │  🎯 Insights  │  ⚠️ Alerts     │
├─────────────────────────────────────────────┤
│  🎁 Trends  │  💡 Recommendations          │
└─────────────────────────────────────────────┘
```

### Sections du Dashboard

#### 1️⃣ **Vue d'Ensemble (Top)**

| Card | Signification |
|------|---------------|
| 💰 Revenue | Argent gagné ce mois |
| 📦 Orders | Nombre de commandes |
| 🧑 Customers | Clients totaux |
| 📈 ROI | Profit par produit |

**Utilité:**
- Voir comment tu gagnes de l'argent
- Suivre les commandes en temps réel

#### 2️⃣ **Graphiques (Middle)**

**Revenue Trend:**
- Montre tes ventes par semaine
- ⬆️ = Ça monte! Bravo!
- ⬇️ = À améliorer

**Top Products:**
- Tes produits qui vendent le plus
- Les pourcentages = parts du profit

**Utilité:**
- Voir quels produits sont rentables
- Détecter les tendances

#### 3️⃣ **Insights (Bottom Left)**

Recommandations IA générées automatiquement:
- "Augmente le prix du produit X de 10%"
- "Ce produit ne vend pas, supprime-le"
- "Les clients du Mali achètent plus le mercredi"

**Utilité:**
- Des suggestions intelligentes
- Basées sur l'analyse IA

#### 4️⃣ **Alerts (Bottom Right)**

Problèmes détectés:
- ⚠️ Stock bas sur produit Y
- ⚠️ Fournisseur 48h de retard
- ❌ Paiement échoué

**Utilité:**
- Ne rien oublier
- Agir vite sur les problèmes

---

## 💻 API USAGE - Comment L'Utiliser en Pratique

### Usage Simple (Via Dashboard)

La plupart des gens n'ont besoin que du dashboard. C'est fait pour ça! 😊

**Les boutons du dashboard font automatiquement les appels API.**

### Usage Avancé (Pour Développeurs)

#### 1️⃣ Analyser les Ventes

```bash
# Dans terminal
curl http://localhost:3000/api/analytics/daily

# Résultat:
# {
#   "date": "2024-01-15",
#   "metrics": {
#     "totalRevenue": 2500,
#     "totalOrders": 12,
#     "avgOrderValue": 208.33
#   }
# }
```

#### 2️⃣ Obtenir Produits Trending

```bash
curl http://localhost:3000/api/predictions/trending

# Résultat:
# [
#   { "name": "Produit A", "score": 0.95, "recommendation": "HIGH" },
#   { "name": "Produit B", "score": 0.72, "recommendation": "MEDIUM" }
# ]
```

#### 3️⃣ Optimiser les Prix

```bash
curl -X POST http://localhost:3000/api/optimizer/prices \
  -H "Content-Type: application/json" \
  -d '{"demandScore": 0.8}'

# Résultat: Liste des prix recommandés
```

#### 4️⃣ Envoyer Message WhatsApp

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+212612345678", "message": "Bonjour!"}'
```

#### 5️⃣ Chercher sur Alibaba

```bash
curl "http://localhost:3000/api/alibaba/search?keyword=phone"

# Résultat: Liste des produits Alibaba avec prix
```

---

## 📚 CAS D'USAGE RÉELS

### 🎯 Cas 1: Tu veux vendre plus ☝️

**Étapes:**

1. Ouvrir dashboard
2. Cliquer sur "Revenue Trend"
3. Voir tes ventes par jour
4. Lire les insights IA
5. **Implémenter les recommandations**

**Exemple:**
- IA dit: "Augmente prix de 15% sur le T-shirt blanc"
- Tu vas sur Shopify
- Tu mets le prix de $20 → $23
- **Boom! +15% de revenu! 💰**

### 🎯 Cas 2: Tu veux automatiser l'inventaire ☝️

**Étapes:**

1. Les stocks se synchronisent automatiquement toutes les 4h
2. Si stock bas:
   - Le bot détecte
   - Commande automatiquement à Alibaba
   - Reçoit et met à jour Shopify
3. **Tu n'as rien à faire!** 🤖

### 🎯 Cas 3: Tu veux supporter tes clients 24/7 ☝️

**Étapes:**

1. Un client écrit sur WhatsApp: "C'est quoi ce produit?"
2. Le bot reçoit le message
3. IA GPT-4 comprend et répond
4. Le bot envoie: "C'est un T-shirt en coton, $25, 5 étoiles ⭐"
5. **Pas besoin d'être là!** 24/7 support 🤖

### 🎯 Cas 4: Tu veux récupérer les paniers abandonnés ☝️

**Étapes:**

1. Client ajoute produits à panier
2. Il quitte sans payer
3. **Le bot détecte automatiquement**
4. Envoie email: "Oubli de payer? -10% si tu finis l'achat!"
5. **30% des clients reviennent!** 💸

### 🎯 Cas 5: Tu veux segmenter tes clients ☝️

**Étapes:**

1. Ouvrir dashboard → "Customer Segments"
2. Voir:
   - **VIP** (50 clients, $5000+ dépensés)
   - **Loyal** (200 clients, 5+ achats)
   - **Occasional** (500 clients, 2-4 achats)
   - **Inactive** (300 clients, 1 achat)
3. **Envoyer des offres différentes à chaque groupe**

---

## 🆘 TROUBLESHOOTING

### ❌ Problème: "Port 3000 is already in use"

**Solution:**

```bash
# Sur Mac/Linux
lsof -i :3000
kill -9 <PID>

# Sur Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou utiliser un autre port
PORT=3001 npm run dev
```

### ❌ Problème: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules
npm install
npm run dev
```

### ❌ Problème: "MongoDB connection refused"

**Solution:**
```bash
# Si utilisant local:
mongod

# Si utilisant Atlas, vérifier:
# 1. MongoDB_URI correcte dans .env
# 2. Pas d'espace au début/fin
# 3. Password avec caractères spéciaux = encoder (look MongoDB doc)
```

### ❌ Problème: "OpenAI API error"

**Solution:**
```bash
# Vérifier:
# 1. OPENAI_API_KEY correct
# 2. Pas d'espace avant/après
# 3. Compte OpenAI a du crédit
# 4. API key pas expirée
```

### ❌ Problème: Dashboard ne charge pas

**Solution:**
```
1. Ouvrir: http://localhost:3000/health
2. Devrait afficher: {"status": "online"}
3. Si erreur = le serveur n'est pas lancé
4. Refaire: npm run dev
```

---

## ✅ WORKFLOW RECOMMANDÉ

### Jour 1: Setup
```bash
Step 1: git clone + npm install (5 min)
Step 2: Ajouter API keys (10 min)
Step 3: npm run dev (1 min)
Step 4: Ouvrir dashboard (1 min)
```

### Jour 2: Configuration
```
Step 1: Connecter Shopify
Step 2: Connecter Alibaba
Step 3: Configurer WhatsApp
Step 4: Tester dashboards
```

### Jour 3: Lancement
```
Step 1: Importer produits
Step 2: Paramétrer stockages
Step 3: Démarrer bot WhatsApp
Step 4: Monitorer métriques
```

### Jour 4+: Optimisation
```
Step 1: Lire insights IA chaque jour
Step 2: Implémenter recommandations
Step 3: Analyser résultats
Step 4: Ajuster stratégie
```

---

## 🎓 RESSOURCES

### Documentation
- 📖 [README.md](../README.md) - Vue d'ensemble
- 📖 [QUICKSTART.md](../QUICKSTART.md) - Démarrage rapide
- 📖 [ARCHITECTURE.md](../docs/ARCHITECTURE.md) - Comment ça fonctionne
- 📖 [DEPLOYMENT.md](../docs/DEPLOYMENT.md) - Déployer en prod

### Vidéos (À venir)
- 🎥 Setup complet (10 min)
- 🎥 Connecter Shopify (5 min)
- 🎥 Dashboard tutorial (10 min)

### Support
- 💬 GitHub Issues
- 📧 Email: support@example.com
- 🆘 Discord: [link]

---

## 🎉 C'EST FAIT!

Maintenant tu sais comment:
- ✅ Installer
- ✅ Configurer
- ✅ Démarrer
- ✅ Utiliser le dashboard
- ✅ Utiliser l'API
- ✅ Résoudre les problèmes

**Prochaine étape: Lance le serveur et regarde la magie se faire! 🚀**

```bash
npm run dev
# Ouvrir http://localhost:3000/dashboard
# Profite! 🎉
```

---

**Questions? Ouvre une issue GitHub ou contacte le support! 😊**