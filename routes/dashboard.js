/**
 * 🎨 Custom Dashboard API - Real-time metrics
 */

const express = require('express');
const router = express.Router();
const AdvancedAnalytics = require('../services/advanced-analytics');
const { Product, Order, Customer } = require('../models');

const analytics = new AdvancedAnalytics();

/**
 * 📊 Dashboard Home
 */
router.get('/overview', async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    res.json({
      revenue: totalRevenue[0]?.total || 0,
      orders: totalOrders,
      products: totalProducts,
      customers: totalCustomers,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 📈 Comprehensive Report
 */
router.get('/report', async (req, res) => {
  try {
    const days = req.query.days || 30;
    const report = await analytics.generateComprehensiveReport(days);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 💰 ROI Analysis
 */
router.get('/roi', async (req, res) => {
  try {
    const roi = await analytics.analyzeROI();
    res.json(roi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🎯 Customer Segments
 */
router.get('/segments', async (req, res) => {
  try {
    const segments = await analytics.segmentCustomers();
    res.json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🔮 Churn Prediction
 */
router.get('/churn-risk', async (req, res) => {
  try {
    const churnRisk = await analytics.predictChurn();
    res.json(churnRisk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 📊 Cohort Analysis
 */
router.get('/cohorts', async (req, res) => {
  try {
    const cohorts = await analytics.cohortAnalysis();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;