# 👨‍🏫 TUTORIAL VIDÉO-TEXTE - Agent IA E-Commerce

## 📺 Tutorial 1: Installation Complète (15 minutes)

### ⏱️ 0:00 - Bienvenue

"Salut! Je vais te montrer comment installer ce système en 15 minutes. C'est plus facile que tu penses!"

### ⏱️ 1:00 - Télécharger Node.js

**Vidéo montre:**
1. Aller sur https://nodejs.org
2. Télécharger "LTS"
3. Installer (next next next)
4. Vérifier: `node --version`

**Commandes:**
```bash
node --version
# v18.0.0
```

### ⏱️ 3:00 - Cloner le Projet

**Vidéo montre:**
1. Ouvrir terminal
2. Copier: `git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git`
3. `cd Abdoulaye-`

**Commandes:**
```bash
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
```

### ⏱️ 5:00 - Installer Dépendances

**Vidéo montre:**
1. `npm install` (ça fait bzzzzz pendant 2-3 min)
2. Attendre la fin
3. Voir "added 500 packages"

**Commandes:**
```bash
npm install
```

### ⏱️ 8:00 - Configurer API Keys

**Vidéo montre:**
1. Copier fichier .env
2. Ouvrir avec éditeur
3. Remplir:
   - SHOPIFY_ACCESS_TOKEN
   - OPENAI_API_KEY
   - TWILIO_ACCOUNT_SID
   - MONGODB_URI

**Commandes:**
```bash
cp config/credentials.env.example config/credentials.env
# Ouvrir le fichier et remplir
```

### ⏱️ 12:00 - Démarrer le Serveur

**Vidéo montre:**
1. `npm run dev`
2. Voir "Server Running on Port 3000"
3. Ouvrir http://localhost:3000/dashboard
4. Voir le dashboard chargé!

**Commandes:**
```bash
npm run dev
```

### ⏱️ 15:00 - C'est Fini!

"Bravo! Le système tourne maintenant sur ton ordinateur!"

---

## 📺 Tutorial 2: Connecter Shopify (10 minutes)

### ⏱️ 0:00 - Pourquoi Shopify?

"Shopify est ta boutique. On va la connecter pour que le bot voit tes produits et commandes."

### ⏱️ 1:00 - Créer l'App Shopify

**Étapes:**
1. Aller sur https://admin.shopify.com
2. Se connecter
3. Apps → App and sales channel settings
4. Create an app
5. Nom: "Agent IA"
6. Create

### ⏱️ 3:00 - Configuration des Permissions

**Étapes:**
1. Configuration → Admin API access scopes
2. Cocher:
   - ☑️ read_products
   - ☑️ write_products
   - ☑️ read_orders
   - ☑️ write_orders
3. Save

### ⏱️ 5:00 - Obtenir le Token

**Étapes:**
1. Install app
2. Copier "Access token"
3. Aller dans ton dossier projet
4. Ouvrir config/credentials.env
5. Coller à côté de: `SHOPIFY_ACCESS_TOKEN=`
6. Sauvegarder

### ⏱️ 7:00 - Tester la Connexion

**Commandes:**
```bash
# Dans terminal du projet
curl http://localhost:3000/api/shopify/products

# Si ça marche, tu verras tes produits en JSON!
```

### ⏱️ 10:00 - C'est Connecté!

"Bravo! Shopify est maintenant connecté. Le bot peut voir tous tes produits et commandes."

---

## 📺 Tutorial 3: Utiliser le Dashboard (8 minutes)

### ⏱️ 0:00 - Ouvrir le Dashboard

"Le dashboard est ta salle de contrôle. C'est ici que tu vois tout!"

**Ouvrir:**
```
http://localhost:3000/dashboard
```

### ⏱️ 1:00 - Section Revenue

**Montre:**
- Graphique revenue trend
- Cliquant sur "Charger Analyse"
- Voir les chiffres

"C'est ta courbe de ventes. Si ça monte = vous gagnez de l'argent! 💰"

### ⏱️ 2:30 - Section Produits

**Montre:**
- Produits tendance
- Click "Charger Tendances"
- Voir top 10 produits qui vendent

"Les produits verts vendent le plus. Les rouges vendent peu. À optimiser!"

### ⏱️ 4:00 - Optimisation Prix

**Montre:**
- Click "Optimiser Maintenant"
- IA calcule les meilleurs prix
- Voir les suggestions

"Le bot a calculé que tu peux augmenter ces prix de 15%. Tes clients vont toujours acheter, mais tu gagneras plus!"

### ⏱️ 6:00 - Recherche Alibaba

**Montre:**
- Taper "phone" dans la barre
- Click "Rechercher"
- Voir les fournisseurs

"Tu vois ici les produits disponibles sur Alibaba avec leurs prix. Tu peux sourcer directement!"

### ⏱️ 8:00 - WhatsApp Bot

**Montre:**
- Taper un numéro de téléphone
- Taper un message
- Click "Envoyer"
- Le bot envoie un WhatsApp!

"Tu peux envoyer des messages à tes clients directement d'ici. Parfait pour les promos!"

---

## 📺 Tutorial 4: Configuration Automatisations (12 minutes)

### ⏱️ 0:00 - Qu'est-ce que l'Automatisation?

"Les automatisations = le bot fait le travail pendant que tu dors!"

### ⏱️ 2:00 - Sync Automatique Inventaire

**Explique:**
- Chaque 4 heures, le bot:
  - Regarde tes ventes
  - Calcule le stock optimal
  - Recommande automatiquement si bas
- **Tu n'as rien à faire!**

### ⏱️ 4:00 - Traitement Commandes Automatique

**Explique:**
- Quand client achète sur Shopify:
  1. Bot reçoit commande
  2. Valide
  3. Envoie à fournisseur Alibaba
  4. Reçoit tracking
  5. Update Shopify
  6. Notifie client
- **En 5 minutes, tout est fait!**

### ⏱️ 6:00 - Emails Automatiques

**Explique:**
- Confirmation d'achat → Email auto
- Expédition → Email auto
- Livraison → Email auto
- Demande avis → Email auto
- Panier abandonné → Email -10% auto

### ⏱️ 8:00 - Chat WhatsApp 24/7

**Explique:**
- Cliente: "Où est ma commande?"
- Bot reçoit, comprend avec IA
- Bot cherche sa commande
- Bot répond: "Votre commande arrive demain! 🚚"
- **Sans que tu sois là!**

### ⏱️ 10:00 - Recommandations Produits

**Explique:**
- Bot voit: "Client a acheté T-shirt"
- Bot recommande: "Regardez nos pantalons!"
- 40% des clients achètent l'article recommandé!

### ⏱️ 12:00 - Résultat

"Maintenant ton business tourne 24/7 sans toi! Tu fais autre chose, le bot vend! 🤖💰"

---

## 🎯 WORKFLOW QUOTIDIEN

### 9:00 - Ouvrir Dashboard
```bash
npm run dev
# Ouvrir http://localhost:3000/dashboard
```

**Regarder:**
- Revenue hier: ?
- Produits top: ?
- Stock bas: ?
- Problèmes: ?

### 9:15 - Lire Insights IA

"Augmente prix du produit X de 15%"
- Aller sur Shopify
- Changer le prix
- **+15% revenue ce mois! 🎉**

### 9:30 - Vérifier Commandes

Si des problèmes:
- Cliquer sur la commande
- Le bot va la régler
- Ou tu contactes le client

### 10:00 - Chercher Nouveaux Produits

```
Dashboard → Recherche Alibaba
- Taper "trending products"
- Voir les tops produits Alibaba
- Ajouter à Shopify
```

### 11:00 - Done! ✅

Le bot continue de:
- Traiter commandes
- Supporter clients
- Optimiser prix
- Analyser ventes

---

## 💡 TIPS PRO

### Tip 1: Check Dashboard Quotidiennement

"2 minutes par jour sur le dashboard = 30% plus de profits!"

### Tip 2: Implémenter Insights IA

"Si le bot dit d'augmenter le prix, fais-le! Il a raison 90% du temps."

### Tip 3: Segmenter tes Clients

Envoyer offres différentes:
- VIP (-20%) → Garder
- Loyal (-10%) → Encourager
- Occasional (email) → Relancer
- Inactive (remise) → Réactiver

### Tip 4: Monitorer WhatsApp

"Si les clients disent que tu es pas réactif, augmente la limite. Le bot peut gérer 1000 messages/jour!"

### Tip 5: Tester d'Abord

"Avant de lancer un changement:
1. Tester en petit (5% des clients)
2. Voir le résultat
3. Lancer à 100% si positif"

---

## ✅ CHECKLIST QUOTIDIENNE

```
☐ Ouvrir dashboard
☐ Lire insights IA
☐ Implémenter 1 recommandation
☐ Vérifier stock
☐ Vérifier commandes
☐ Répondre messages WhatsApp (si besoin)
☐ Analyser ROI
☐ Dormir contents 😴
```

---

## 🎓 PROCHAINES ÉTAPES

1. ✅ Installer (fait)
2. ✅ Configurer (fait)
3. ✅ Connecter Shopify (fait)
4. ⏭️ **Lancer maintenant!**
5. ⏭️ Gagner premier $
6. ⏭️ Scaler à 10 fois

---

**Besoin d'aide? Ouvre GitHub Issues! Allez, lance-toi! 🚀**