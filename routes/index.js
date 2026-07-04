/**
 * 🔗 Unified API Routes - All endpoints in one file
 */

const express = require('express');
const ShopifyAPI = require('./integrations/shopify-api');
const AlibabaAPI = require('./integrations/alibaba-api');
const WhatsAppBot = require('./integrations/whatsapp-bot');
const SalesAnalyzer = require('./agent-core/analyzer');
const SalesPredictor = require('./agent-core/predictor');
const Optimizer = require('./agent-core/optimizer');
const OrderProcessor = require('./automation/order-processor');
const MarketingEngine = require('./automation/marketing-engine');
const BotEngine = require('./services/bot-engine');
const dashboardRoutes = require('./routes/dashboard');

function setupRoutes(app) {
  const shopify = new ShopifyAPI();
  const alibaba = new AlibabaAPI();
  const whatsapp = new WhatsAppBot();
  const analyzer = new SalesAnalyzer();
  const predictor = new SalesPredictor();
  const optimizer = new Optimizer();
  const orderProcessor = new OrderProcessor();
  const marketing = new MarketingEngine();
  const bot = new BotEngine();

  // ✅ Health Check
  app.get('/health', (req, res) => {
    res.json({
      status: 'online',
      timestamp: new Date(),
      version: '2.0.0',
      uptime: process.uptime(),
    });
  });

  // 📊 Analytics Routes
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

  // 🔮 Prediction Routes
  app.get('/api/predictions/trending', async (req, res) => {
    try {
      const products = await shopify.getProducts();
      const trending = await predictor.predictTrendingProducts(products);
      res.json(trending);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/predictions/price', async (req, res) => {
    try {
      const prediction = await predictor.predictOptimalPrice(req.body.product, req.body.marketData);
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 💰 Optimizer Routes
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

  // 🛒 Shopify Routes
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

  // 📦 Alibaba Routes
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
      const prices = await alibaba.comparePrices(req.body.product, req.body.quantity);
      res.json(prices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 💬 WhatsApp Routes
  app.post('/api/whatsapp/send', async (req, res) => {
    try {
      const result = await whatsapp.sendMessage(req.body.phone, req.body.message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/whatsapp/handle-message', async (req, res) => {
    try {
      const aiResponse = await whatsapp.getAIResponse(req.body.message);
      await whatsapp.sendMessage(req.body.phone, aiResponse);
      res.json({ success: true, response: aiResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/whatsapp/product-inquiry', async (req, res) => {
    try {
      await whatsapp.handleProductInquiry(req.body.productName, req.body.phone);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 🤖 Bot Routes
  app.post('/api/bot/process', async (req, res) => {
    try {
      const response = await bot.processIntent(req.body.message, req.body.context);
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 📧 Marketing Routes
  app.post('/api/marketing/recommendations', async (req, res) => {
    try {
      const recommendations = await marketing.generateRecommendations(req.body.purchaseHistory);
      res.json({ recommendations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/marketing/abandoned-cart', async (req, res) => {
    try {
      const email = await marketing.createAbandonedCartEmail(req.body.cart);
      res.json({ email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/marketing/campaign', async (req, res) => {
    try {
      const campaign = await marketing.generatePromoCampaign(req.body.productType, req.body.discount);
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 📦 Order Routes
  app.post('/api/orders/process', async (req, res) => {
    try {
      await orderProcessor.queueOrder(req.body);
      res.json({ success: true, message: 'Order queued' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 📊 Dashboard Routes
  app.use('/api/dashboard', dashboardRoutes);

  // 🎨 Serve Dashboards
  app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard/index.html');
  });

  app.get('/dashboard/advanced', (req, res) => {
    res.sendFile(__dirname + '/dashboard/advanced.html');
  });
}

module.exports = setupRoutes;