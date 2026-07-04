# 🏃 INSTRUCTIONS INSTALLATION ULTRA-RAPIDE

## ⚡ Option 1: Automatisé (1 commande!)

### Sur Mac/Linux:
```bash
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
bash INSTALL.sh
```

### Sur Windows (PowerShell):
```powershell
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
node quickstart.js
```

---

## ⚡ Option 2: Manuel (Copy-Paste)

### Étape 1: Télécharger
```bash
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
```

### Étape 2: Installer
```bash
npm install
```
*(Attends 2-3 minutes)*

### Étape 3: Copier le fichier config
```bash
cp config/credentials.env.example config/credentials.env
```

### Étape 4: Remplir les API Keys

Ouvre le fichier: `config/credentials.env`

Ajoute tes clés (minimum 2):

#### 🔑 Clé 1: SHOPIFY (RECOMMANDÉ)

```
SHOPIFY_STORE_NAME=ton-store
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
```

[Voir comment obtenir](GUIDE_UTILISATION.md#shopify)

#### 🔑 Clé 2: OPENAI (OBLIGATOIRE)

```
OPENAI_API_KEY=sk-xxxxx
```

[Voir comment obtenir](GUIDE_UTILISATION.md#openai)

#### 🔑 Clé 3: MongoDB (Optionnel pour local)

Laisser par défaut:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce-ai
```

### Étape 5: Lancer!

```bash
npm run dev
```

### Étape 6: Ouvrir

Dans ton navigateur:
```
http://localhost:3000/dashboard
```

**BOOM! 🎉 C'est lancé!**

---

## 🚀 MAINTENANT: Donner du Travail au Bot

### Travail 1: Analyser tes Ventes

```bash
# Depuis terminal (Ctrl+Alt+T ou terminal)
curl http://localhost:3000/api/analytics/daily
```

**Résultat:** Tes ventes d'aujourd'hui

### Travail 2: Voir Produits Trending

```bash
curl http://localhost:3000/api/predictions/trending
```

**Résultat:** Produits qui vont vendre demain

### Travail 3: Optimiser les Prix

```bash
curl -X POST http://localhost:3000/api/optimizer/prices \
  -H "Content-Type: application/json" \
  -d '{"demandScore": 0.8}'
```

**Résultat:** Nouveaux prix recommandés

### Travail 4: Envoyer WhatsApp

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+212612345678", "message": "Bonjour! 👋"}'
```

**Résultat:** Message WhatsApp envoyé!

### Travail 5: Chercher sur Alibaba

```bash
curl "http://localhost:3000/api/alibaba/search?keyword=phone"
```

**Résultat:** Tous les phones disponibles sur Alibaba

---

## 📊 Via le Dashboard (Plus Facile!)

Simplement clique sur les boutons du dashboard:
- 📊 "Charger Analyse"
- 🎯 "Charger Tendances"
- 💰 "Optimiser Prix"
- 📦 "Rechercher" (Alibaba)
- 💬 "Envoyer" (WhatsApp)

---

## ✅ Checklist de Démarrage

```
☑️  Installer Node.js
☑️  git clone
☑️  npm install
☑️  Créer .env
☑️  Ajouter OPENAI_API_KEY
☑️  npm run dev
☑️  Ouvrir dashboard
☑️  Tester curl commands
☑️  Donner du travail au bot
☑️  Regarder la magie! ✨
```

---

## 🎁 Bonus: Alias pour Lancer Plus Vite

### Sur Mac/Linux:

Ajoute à `~/.bash_profile` ou `~/.zshrc`:

```bash
alias ecom='cd ~/Abdoulaye- && npm run dev'
```

Alors juste tape:
```bash
ecom
```

### Sur Windows (PowerShell):

Créer fichier: `Documents/PowerShell/profile.ps1`

Ajouter:
```powershell
Set-Alias ecom 'C:\Path\To\Abdoulaye-\quickstart.js'
```

---

## 🎯 Prochaines Étapes

1. ✅ Installation (FAIT!)
2. 📖 Lire GUIDE_UTILISATION.md
3. 🎬 Regarder TUTORIAL_VIDEO.md
4. 🚀 Commencer à automatiser!
5. 💰 Gagner de l'argent!

---

## 💬 Besoin d'aide?

- 📖 [GUIDE_UTILISATION.md](GUIDE_UTILISATION.md) - Toutes les réponses
- 📹 [TUTORIAL_VIDEO.md](TUTORIAL_VIDEO.md) - Vidéos tutorielles
- 🐛 GitHub Issues - Rapport de bug
- 📧 Email - Support

---

**C'est parti! 🚀 Donne du travail au bot et regarde les résultats!**