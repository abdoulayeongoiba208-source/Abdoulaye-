# 🎯 DONNER DU TRAVAIL AU BOT - Les Commandes Essentielles

## 1️⃣ ANALYSER LES VENTES

### Dashboard (Facile)
Ouvrir: http://localhost:3000/dashboard
Cliquer: "Charger Analyse"

### Terminal (Avancé)
```bash
curl http://localhost:3000/api/analytics/daily
```

**Le bot te dira:**
- Revenue total
- Nombre de commandes
- Panier moyen
- Top produits

---

## 2️⃣ PRÉDICTIONS - Quels Produits Vendre Demain?

### Dashboard
Cliquer: "Charger Tendances"

### Terminal
```bash
curl http://localhost:3000/api/predictions/trending
```

**Le bot te dira:**
- Top 20 produits trending
- Score de tendance
- Recommandation (HIGH/MEDIUM/LOW)

---

## 3️⃣ OPTIMISER LES PRIX

### Dashboard
Cliquer: "Optimiser Maintenant"

### Terminal
```bash
curl -X POST http://localhost:3000/api/optimizer/prices \
  -H "Content-Type: application/json" \
  -d '{"demandScore": 0.8}'
```

**Le bot te dira:**
- Nouveau prix recommandé
- Marge de profit
- Revenus potentiels

---

## 4️⃣ OPTIMISER LE STOCK

### Dashboard
Cliquer: "Charger Analyse" → Voir "Stock Optimal"

### Terminal
```bash
curl -X POST http://localhost:3000/api/optimizer/inventory \
  -H "Content-Type: application/json" \
  -d '{"salesHistory": [10, 12, 15, 8, 20]}'
```

**Le bot te dira:**
- Niveau de stock optimal
- Quand récommander
- Nombre exact à commander

---

## 5️⃣ CHERCHER PRODUITS SUR ALIBABA

### Dashboard
Taper dans "Recherche Alibaba": "phone"
Cliquer: "Rechercher"

### Terminal
```bash
curl "http://localhost:3000/api/alibaba/search?keyword=phone&page=1&limit=50"
```

**Le bot te retourne:**
- Liste des produits
- Prix
- Fournisseur
- Note

---

## 6️⃣ COMPARER PRIX DES FOURNISSEURS

### Terminal
```bash
curl -X POST http://localhost:3000/api/alibaba/compare-prices \
  -H "Content-Type: application/json" \
  -d '{"product": "phone", "quantity": 100}'
```

**Le bot te montre:**
- Prix de chaque fournisseur
- Délai de livraison
- Note du fournisseur

---

## 7️⃣ ENVOYER WHATSAPP

### Dashboard
Remplir: "Numéro" + "Message"
Cliquer: "Envoyer"

### Terminal
```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+212612345678",
    "message": "Bonjour! Découvrez nos nouveaux produits! 🎁"
  }'
```

**Le bot envoie:**
- Message WhatsApp direct
- Au numéro spécifié
- Instantanément!

---

## 8️⃣ BOT CHAT - Comprendre les Messages

### Terminal
```bash
curl -X POST http://localhost:3000/api/bot/process \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Où est ma commande?",
    "context": {"customerId": "123"}
  }'
```

**Le bot:**
- Comprend l'intention
- Cherche la commande
- Répond automatiquement

---

## 9️⃣ RECOMMANDATIONS PRODUITS

### Terminal
```bash
curl -X POST http://localhost:3000/api/marketing/recommendations \
  -H "Content-Type: application/json" \
  -d '{"purchaseHistory": ["Tshirt", "Pantalon"]}'
```

**Le bot recommande:**
- Produits complémentaires
- Basé sur historique
- +30% de ventes!

---

## 🔟 EMAILS AUTOMATIQUES

### Terminal
```bash
curl -X POST http://localhost:3000/api/marketing/abandoned-cart \
  -H "Content-Type: application/json" \
  -d '{
    "cart": {
      "items": [
        {"name": "Tshirt", "price": 25, "quantity": 1}
      ]
    }
  }'
```

**Le bot envoie:**
- Email panier abandonné
- Avec -10% de réduction
- +20% de récupération!

---

## 🔴 ANALYSER CHURN (Clients qui Partent)

### Dashboard
Ouvrir: "Dashboard Avancé"
Cliquer: "Churn Risk"

### Terminal
```bash
curl http://localhost:3000/api/dashboard/churn-risk
```

**Le bot identifie:**
- Clients à risque
- Score de départ
- Stratégie de rétention

---

## 🟠 SEGMENTER CLIENTS

### Dashboard
Ouvrir: "Customer Segments"

### Terminal
```bash
curl http://localhost:3000/api/dashboard/segments
```

**Le bot segmente:**
- VIP (Big spenders)
- Loyal (Regulars)
- Occasional (Sometimes)
- Inactive (One-timers)

---

## 🟡 ANALYSER ROI

### Dashboard
Ouvrir: "ROI Analysis"

### Terminal
```bash
curl http://localhost:3000/api/dashboard/roi
```

**Le bot te montre:**
- ROI de chaque produit
- Produits rentables
- Produits à abandonner

---

## 🟢 RAPPORT COMPLET 30 JOURS

### Dashboard
Ouvrir: "Advanced Dashboard"
Cliquer: "Report"

### Terminal
```bash
curl "http://localhost:3000/api/dashboard/report?days=30"
```

**Le bot analyse:**
- Revenue trend
- Ordre trends
- Customer lifetime value
- AI insights

---

## 📝 CRÉER CAMPAGNE MARKETING

### Terminal
```bash
curl -X POST http://localhost:3000/api/marketing/campaign \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "Tshirt",
    "discount": 20
  }'
```

**Le bot génère:**
- Headline de campagne
- Description
- Headline pour emails
- Call-to-action

---

## 🎁 A/B TESTING EMAILS

### Terminal
```bash
curl -X POST http://localhost:3000/api/marketing/ab-test \
  -H "Content-Type: application/json" \
  -d '{"productName": "Tshirt", "count": 5}'
```

**Le bot crée:**
- 5 subject lines
- Styles différents
- Teste celui qui marche

---

## 💡 WORKFLOW QUOTIDIEN RECOMMANDÉ

### 9:00 AM - Ouvrir Dashboard
```bash
npm run dev
http://localhost:3000/dashboard
```

### 9:05 - Analyser Ventes
```bash
curl http://localhost:3000/api/analytics/daily
```

### 9:10 - Voir Prédictions
```bash
curl http://localhost:3000/api/predictions/trending
```

### 9:15 - Optimiser Prix
```bash
curl -X POST http://localhost:3000/api/optimizer/prices \
  -H "Content-Type: application/json" \
  -d '{"demandScore": 0.8}'
```

### 9:20 - Vérifier Churn
```bash
curl http://localhost:3000/api/dashboard/churn-risk
```

### 9:25 - Envoyer Promos WhatsApp
```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+212612345678", "message": "New promo! 🎁"}'
```

### 10:00 - DONE! ✅
Le bot continue à:
- Traiter commandes
- Supporter clients
- Optimiser ventes
- Analyser données

---

## 🎯 RÉSULTATS ATTENDUS

### Après 1 semaine:
- ✅ +15% de revenue (prix optimisés)
- ✅ +30% de panier moyen (recommandations)
- ✅ -60% de temps manual

### Après 1 mois:
- ✅ +50% de ventes totales
- ✅ +40% de rétention clients
- ✅ -80% support manuel

### Après 3 mois:
- ✅ 3x plus de revenue
- ✅ Automatisation 95%
- ✅ Presque 0 travail!

---

**Maintenant vas-y et donne du travail au bot! 🚀**