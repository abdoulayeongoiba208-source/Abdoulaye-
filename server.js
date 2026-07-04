/**
 * 🚀 Main Server - Express backend
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const SalesAnalyzer = require('./agent-core/analyzer');
const SalesPredictor = require('./agent-core/predictor');
const Optimizer = require('./agent-core/optimizer');
const OrderProcessor = require('./automation/order-processor');
const InventorySync = require('./automation/inventory-sync');
const MarketingEngine = require('./automation/marketing-engine');
const ShopifyAPI = require('./integrations/shopify-api');
const AlibabaAPI = require('./integrations/alibaba-api');
const WhatsAppBot = require('./integrations/whatsapp-bot');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize modules
const analyzer = new SalesAnalyzer();
const predictor = new SalesPredictor();
const optimizer = new Optimizer();
const orderProcessor = new OrderProcessor();
const inventorySync = new InventorySync();
const marketingEngine = new MarketingEngine();
const shopify = new ShopifyAPI();
const alibaba = new AlibabaAPI();
const whatsappBot = new WhatsAppBot();

// ✅ Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    version: '1.0.0',
  });
});

// 📊 Analytics Endpoints
app.get('/api/analytics/daily', async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const analysis = await analyzer.analyzeDailySales(date);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/products', async (req, res) => {
  try {
    const analysis = await analyzer.analyzeProductPerformance();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/regions', async (req, res) => {
  try {
    const analysis = await analyzer.analyzeRegionalPerformance();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔮 Predictions Endpoints
app.get('/api/predictions/trending', async (req, res) => {
  try {
    const products = await shopify.getProducts();
    const trending = await predictor.predictTrendingProducts(products);
    res.json(trending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 💰 Optimizer Endpoints
app.post('/api/optimizer/prices', async (req, res) => {
  try {
    const products = await shopify.getProducts();
    const optimizations = await optimizer.optimizeAllPrices(products, req.body);
    res.json(optimizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/optimizer/inventory', async (req, res) => {
  try {
    const products = await shopify.getProducts();
    const optimizations = await optimizer.optimizeInventory(products, req.body.salesHistory);
    res.json(optimizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📦 Shopify Endpoints
app.get('/api/shopify/products', async (req, res) => {
  try {
    const products = await shopify.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/shopify/orders', async (req, res) => {
  try {
    const orders = await shopify.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/shopify/products', async (req, res) => {
  try {
    const product = await shopify.createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🛍️ Alibaba Endpoints
app.get('/api/alibaba/search', async (req, res) => {
  try {
    const results = await alibaba.searchProducts(req.query.keyword, req.query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/alibaba/trending', async (req, res) => {
  try {
    const trending = await alibaba.findTrendingProducts(req.query.category);
    res.json(trending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/alibaba/compare-prices', async (req, res) => {
  try {
    const prices = await alibaba.comparePrices(
      req.body.product,
      req.body.quantity
    );
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 💬 WhatsApp Endpoints
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const result = await whatsappBot.sendMessage(
      req.body.phone,
      req.body.message
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/whatsapp/handle-message', async (req, res) => {
  try {
    const aiResponse = await whatsappBot.getAIResponse(req.body.message);
    await whatsappBot.sendMessage(req.body.phone, aiResponse);
    res.json({ success: true, response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/whatsapp/product-inquiry', async (req, res) => {
  try {
    await whatsappBot.handleProductInquiry(
      req.body.productName,
      req.body.phone
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📦 Order Processing
app.post('/api/orders/process', async (req, res) => {
  try {
    await orderProcessor.queueOrder(req.body);
    res.json({ success: true, message: 'Order queued' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📧 Marketing Endpoints
app.post('/api/marketing/recommendations', async (req, res) => {
  try {
    const recommendations = await marketingEngine.generateRecommendations(
      req.body.purchaseHistory
    );
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/marketing/abandoned-cart', async (req, res) => {
  try {
    const email = await marketingEngine.createAbandonedCartEmail(req.body.cart);
    res.json({ email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/marketing/campaign', async (req, res) => {
  try {
    const campaign = await marketingEngine.generatePromoCampaign(
      req.body.productType,
      req.body.discount
    );
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/marketing/ab-test', async (req, res) => {
  try {
    const subjects = await marketingEngine.generateABTestSubjects(
      req.body.productName,
      req.body.count
    );
    res.json({ subjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔄 Real-time Socket.IO
io.on('connection', (socket) => {
  console.log(`🔗 Client connected: ${socket.id}`);

  socket.on('request-analysis', async () => {
    try {
      const analysis = await analyzer.analyzeDailySales(new Date());
      socket.emit('analysis-update', analysis);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('request-predictions', async () => {
    try {
      const products = await shopify.getProducts();
      const trending = await predictor.predictTrendingProducts(products);
      socket.emit('predictions-update', trending);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`
🚀 Agent IA E-Commerce Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/health`);
  console.log(`\n📝 Environment: ${process.env.NODE_ENV || 'development'}\n`);

  // Initialize services
  try {
    console.log('⚙️ Initializing services...');
    await predictor.initializeModel();
    inventorySync.startAutoSync();
    console.log('✅ All services initialized\n');
  } catch (error) {
    console.error('❌ Error initializing:', error);
  }
});

module.exports = app;