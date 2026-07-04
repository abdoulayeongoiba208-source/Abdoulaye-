#!/usr/bin/env node

/**
 * 🛠️ Setup Script - Initialize Agent IA E-Commerce
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function setup() {
  console.log('\n🚀 Agent IA E-Commerce Setup');
  console.log('============================\n');

  // Check Node version
  const nodeVersion = process.version;
  console.log(`✅ Node.js ${nodeVersion}`);

  // Check if .env exists
  const envPath = path.join(__dirname, 'config/credentials.env');
  if (!fs.existsSync(envPath)) {
    console.log('\n⚠️  Environment file not found. Creating...');
    const examplePath = path.join(__dirname, 'config/credentials.env.example');
    fs.copyFileSync(examplePath, envPath);
    console.log('✅ Created config/credentials.env');
    console.log('\n📝 Please fill in your API keys in config/credentials.env\n');
  } else {
    console.log('✅ Environment file exists');
  }

  // Ask for API keys
  console.log('\n🔑 Configure API Keys (leave blank to skip):');

  const apiKeys = {};
  apiKeys.shopifyToken = await question('Shopify Access Token: ');
  apiKeys.openaiKey = await question('OpenAI API Key: ');
  apiKeys.twilioSid = await question('Twilio Account SID: ');
  apiKeys.twilioToken = await question('Twilio Auth Token: ');
  apiKeys.mongoUri = await question('MongoDB URI [mongodb://localhost:27017]: ') || 'mongodb://localhost:27017/ecommerce';

  // Update .env
  let envContent = fs.readFileSync(envPath, 'utf8');
  if (apiKeys.shopifyToken) envContent = envContent.replace(/SHOPIFY_ACCESS_TOKEN=.*/g, `SHOPIFY_ACCESS_TOKEN=${apiKeys.shopifyToken}`);
  if (apiKeys.openaiKey) envContent = envContent.replace(/OPENAI_API_KEY=.*/g, `OPENAI_API_KEY=${apiKeys.openaiKey}`);
  if (apiKeys.twilioSid) envContent = envContent.replace(/TWILIO_ACCOUNT_SID=.*/g, `TWILIO_ACCOUNT_SID=${apiKeys.twilioSid}`);
  if (apiKeys.twilioToken) envContent = envContent.replace(/TWILIO_AUTH_TOKEN=.*/g, `TWILIO_AUTH_TOKEN=${apiKeys.twilioToken}`);
  if (apiKeys.mongoUri) envContent = envContent.replace(/MONGODB_URI=.*/g, `MONGODB_URI=${apiKeys.mongoUri}`);
  
  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ Environment file updated');

  // Install dependencies
  const installDeps = await question('\nInstall dependencies? (y/n): ');
  if (installDeps.toLowerCase() === 'y') {
    console.log('\n📦 Installing packages...');
    require('child_process').execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  }

  // Start development
  const startDev = await question('\nStart development server? (y/n): ');
  if (startDev.toLowerCase() === 'y') {
    console.log('\n🚀 Starting server...\n');
    require('child_process').spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  } else {
    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('1. npm install          - Install dependencies');
    console.log('2. npm run dev          - Start development server');
    console.log('3. Open http://localhost:3000/dashboard');
    console.log('\n');
  }

  rl.close();
}

setup().catch(console.error);