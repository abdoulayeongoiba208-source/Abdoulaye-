/**
 * 🚀 Updated Server with All Integrations
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const setupRoutes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database Connection
const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-ai');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Setup Routes
setupRoutes(app);

// Socket.io Real-time Events
io.on('connection', (socket) => {
  console.log(`🔗 Client connected: ${socket.id}`);

  socket.on('request-update', async () => {
    try {
      socket.emit('update', { timestamp: new Date() });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message,
    timestamp: new Date(),
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`
🚀 ================================================`);
  console.log(`   Agent IA E-Commerce Server`);
  console.log(`================================================`);
  console.log(`
✅ Server Running on Port: ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`📈 Advanced Dashboard: http://localhost:${PORT}/dashboard/advanced`);
  console.log(`💻 API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`
🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 Security: Helmet + CORS Enabled`);
  console.log(`📡 Real-time: Socket.io Connected`);
  console.log(`
================================================\n`);

  // Connect Database
  await connectDB();

  // Start Services
  try {
    const InventorySync = require('./automation/inventory-sync');
    const BotEngine = require('./services/bot-engine');
    
    const inventory = new InventorySync();
    inventory.startAutoSync();
    console.log('✅ Inventory Sync Started');

    const bot = new BotEngine();
    bot.scheduleAutomatedTasks();
    console.log('✅ Bot Automation Started');

    console.log('\n🎉 All Systems Online!\n');
  } catch (error) {
    console.error('⚠️ Service initialization error:', error);
  }
});

module.exports = app;