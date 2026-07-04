#!/usr/bin/env node

/**
 * 🚀 QUICK START - Lance tout automatiquement
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
};

function log(color, text) {
  console.log(`${color}${text}${colors.reset}`);
}

async function start() {
  console.clear();
  log(colors.blue, `
  ╔════════════════════════════════════════════════════╗
  ║  🚀 AGENT IA E-COMMERCE                           ║
  ║  Installation Express & Lancement                 ║
  ╚════════════════════════════════════════════════════╝
  `);

  // Check Node.js
  log(colors.bright, '\n📋 Vérifications...');
  const nodeVersion = process.version;
  log(colors.green, `✅ Node.js ${nodeVersion}`);

  // Check .env
  const envPath = path.join(__dirname, 'config/credentials.env');
  if (!fs.existsSync(envPath)) {
    log(colors.yellow, '\n⚠️  Fichier .env non trouvé');
    log(colors.yellow, '   Création du fichier...');
    
    const examplePath = path.join(__dirname, 'config/credentials.env.example');
    if (fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath);
      log(colors.green, '✅ Fichier créé: config/credentials.env');
      log(colors.yellow, '\n⚠️  IMPORTANT: Remplis tes API keys dans config/credentials.env');
      log(colors.yellow, '   Puis relance cette commande!');
      return;
    }
  } else {
    log(colors.green, '✅ Fichier .env trouvé');
  }

  // Start server
  log(colors.bright, '\n🚀 Lancement du serveur...');
  log(colors.blue, '   Attends 5-10 secondes...\n');

  const server = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    stdio: 'inherit',
  });

  server.on('error', (err) => {
    log(colors.red, `\n❌ Erreur: ${err.message}`);
    process.exit(1);
  });

  server.on('exit', (code) => {
    if (code !== 0) {
      log(colors.red, `\n❌ Serveur arrêté (code: ${code})`);
    }
  });

  // Instructions
  setTimeout(() => {
    log(colors.green, `
  ╔════════════════════════════════════════════════════╗
  ║  ✅ SERVEUR LANCÉ!                                ║
  ╚════════════════════════════════════════════════════╝
    `);
    log(colors.bright, '📊 OUVRIR CES URLS DANS TON NAVIGATEUR:');
    log(colors.blue, '   🌐 Dashboard: http://localhost:3000/dashboard');
    log(colors.blue, '   🌐 API: http://localhost:3000/api');
    log(colors.blue, '   🌐 Avancé: http://localhost:3000/dashboard/advanced');
    log(colors.green, '\n✅ Prêt à donner du travail au bot!');
    log(colors.yellow, '\n💡 Voir GUIDE_UTILISATION.md pour les cas d\'usage');
    log(colors.yellow, '   ou tape: npm run help\n');
  }, 2000);
}

start().catch(err => {
  log(colors.red, `\n❌ Erreur: ${err.message}`);
  process.exit(1);
});