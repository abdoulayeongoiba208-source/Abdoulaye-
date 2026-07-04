#!/bin/bash
# 🚀 INSTALLATION ULTRA-RAPIDE - Agent IA E-Commerce
# Copie-colle ces commandes une par une!

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 AGENT IA E-COMMERCE - INSTALLATION EXPRESS            ║"
echo "║  Tout est automatisé! Juste copy-paste les commandes!      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# STEP 1: Télécharger
echo "📥 ÉTAPE 1/5: Télécharger le code..."
git clone https://github.com/abdoulayeongoiba208-source/Abdoulaye-.git
cd Abdoulaye-
echo "✅ Téléchargé!"
echo ""

# STEP 2: Installer
echo "📦 ÉTAPE 2/5: Installer les dépendances (2-3 minutes)..."
npm install
echo "✅ Dépendances installées!"
echo ""

# STEP 3: Créer .env
echo "⚙️  ÉTAPE 3/5: Créer fichier configuration..."
cp config/credentials.env.example config/credentials.env
echo "✅ Fichier créé: config/credentials.env"
echo ""

# STEP 4: Remplir .env
echo "🔑 ÉTAPE 4/5: Ajouter tes API Keys..."
echo ""
echo "Ouvre le fichier: config/credentials.env"
echo ""
echo "Remplis ces valeurs:"
echo "  1. SHOPIFY_ACCESS_TOKEN (voir tuto)"
echo "  2. OPENAI_API_KEY (voir tuto)"
echo "  3. TWILIO_ACCOUNT_SID (voir tuto)"
echo "  4. TWILIO_AUTH_TOKEN (voir tuto)"
echo "  5. MONGODB_URI (laisser par défaut si local)"
echo ""
echo "Appuie sur ENTER quand tu as fini..."
read

# STEP 5: Lancer
echo ""
echo "🚀 ÉTAPE 5/5: Lancement du serveur..."
echo ""
echo "Ton système démarre..."
echo ""

npm run dev