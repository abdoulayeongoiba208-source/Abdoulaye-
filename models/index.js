/**
 * 💾 Database Models - MongoDB schemas
 */

const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
  shopifyId: String,
  title: String,
  description: String,
  price: Number,
  cost: Number,
  sku: String,
  category: String,
  images: [String],
  rating: Number,
  reviews: Number,
  inventory: {
    current: Number,
    reorder: Number,
    optimal: Number,
  },
  supplier: {
    alibabId: String,
    name: String,
    price: Number,
    leadTime: Number,
    rating: Number,
  },
  metrics: {
    dailySales: Number,
    weeklySales: Number,
    roi: Number,
    profit: Number,
    trend: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Order Schema
const OrderSchema = new mongoose.Schema({
  shopifyOrderId: String,
  customerId: String,
  customerEmail: String,
  customerPhone: String,
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalPrice: Number,
  status: { type: String, default: 'pending' }, // pending, paid, shipped, delivered
  supplier: {
    alibabaOrderId: String,
    tracking: String,
    carrier: String,
    estimatedDelivery: Date,
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    country: String,
    postal: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Analytics Schema
const AnalyticsSchema = new mongoose.Schema({
  date: Date,
  metrics: {
    totalRevenue: Number,
    totalOrders: Number,
    avgOrderValue: Number,
    conversionRate: Number,
    topProducts: [String],
    topRegions: [String],
  },
  insights: String,
  predictions: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

// Customer Schema
const CustomerSchema = new mongoose.Schema({
  shopifyId: String,
  email: String,
  phone: String,
  name: String,
  totalOrders: Number,
  totalSpent: Number,
  lastOrderDate: Date,
  preferences: {
    newsletter: Boolean,
    sms: Boolean,
    push: Boolean,
  },
  createdAt: { type: Date, default: Date.now },
});

// Create Models
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);
const Analytics = mongoose.model('Analytics', AnalyticsSchema);
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = { Product, Order, Analytics, Customer };