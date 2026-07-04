/**
 * 📊 Sales Analyzer - Analyzes real-time sales data and trends
 */

const axios = require('axios');
const { OpenAI } = require('openai');

class SalesAnalyzer {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.salesData = {
      daily: [],
      weekly: [],
      monthly: [],
      byProduct: {},
      byRegion: {},
    };
  }

  /**
   * 🔍 Analyze daily sales performance
   */
  async analyzeDailySales(date) {
    try {
      console.log(`📊 Analyzing sales for ${date}...`);
      
      const salesMetrics = {
        totalRevenue: 0,
        totalOrders: 0,
        avgOrderValue: 0,
        conversionRate: 0,
        topProducts: [],
        topRegions: [],
      };

      // Fetch from Shopify
      const shopifySales = await this.fetchShopifySales(date);
      
      // Calculate metrics
      salesMetrics.totalRevenue = shopifySales.reduce((sum, order) => sum + order.total_price, 0);
      salesMetrics.totalOrders = shopifySales.length;
      salesMetrics.avgOrderValue = salesMetrics.totalRevenue / salesMetrics.totalOrders;

      // Get AI insights
      const insights = await this.getAIInsights('daily_sales', salesMetrics);
      
      return {
        date,
        metrics: salesMetrics,
        insights,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('❌ Error analyzing daily sales:', error);
      throw error;
    }
  }

  /**
   * 📈 Analyze product performance
   */
  async analyzeProductPerformance() {
    try {
      console.log('📈 Analyzing product performance...');
      
      const products = await this.fetchAllProducts();
      const productMetrics = {};

      for (const product of products) {
        const sales = await this.getProductSales(product.id);
        
        productMetrics[product.id] = {
          name: product.title,
          totalSales: sales.length,
          revenue: sales.reduce((sum, s) => sum + s.price, 0),
          avgRating: product.rating || 0,
          profitMargin: this.calculateMargin(product),
          trend: await this.analyzeTrend(product.id),
          roi: this.calculateROI(product, sales),
        };
      }

      // Sort by ROI
      const sortedProducts = Object.entries(productMetrics)
        .sort((a, b) => b[1].roi - a[1].roi)
        .slice(0, 50); // Top 50

      return {
        analysis: Object.fromEntries(sortedProducts),
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('❌ Error analyzing products:', error);
      throw error;
    }
  }

  /**
   * 🌍 Analyze regional performance
   */
  async analyzeRegionalPerformance() {
    try {
      console.log('🌍 Analyzing regional performance...');
      
      const orders = await this.fetchAllOrders();
      const regionalData = {};

      for (const order of orders) {
        const region = order.shipping_address.country;
        
        if (!regionalData[region]) {
          regionalData[region] = {
            orders: 0,
            revenue: 0,
            customers: new Set(),
          };
        }

        regionalData[region].orders++;
        regionalData[region].revenue += order.total_price;
        regionalData[region].customers.add(order.customer.id);
      }

      // Convert sets to counts
      const regionalMetrics = Object.entries(regionalData).map(([region, data]) => ({
        region,
        orders: data.orders,
        revenue: data.revenue,
        customers: data.customers.size,
        avgOrderValue: data.revenue / data.orders,
      }));

      return {
        regions: regionalMetrics.sort((a, b) => b.revenue - a.revenue),
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('❌ Error analyzing regions:', error);
      throw error;
    }
  }

  /**
   * 🎯 Get AI-powered insights
   */
  async getAIInsights(analysisType, data) {
    try {
      const prompt = `Analyze this ${analysisType} data and provide 3-5 actionable insights: ${JSON.stringify(data)}`;
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert e-commerce analyst. Provide concise, actionable insights.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('❌ Error getting AI insights:', error);
      return 'Analysis in progress...';
    }
  }

  /**
   * 📊 Calculate product margin
   */
  calculateMargin(product) {
    const cost = product.cost || product.price * 0.4;
    const markup = ((product.price - cost) / product.price) * 100;
    return Math.round(markup);
  }

  /**
   * 💰 Calculate ROI
   */
  calculateROI(product, sales) {
    const revenue = sales.reduce((sum, s) => sum + s.price, 0);
    const cost = product.cost ? sales.length * product.cost : revenue * 0.4;
    const roi = ((revenue - cost) / cost) * 100;
    return Math.round(roi);
  }

  /**
   * 📉 Analyze sales trend
   */
  async analyzeTrend(productId) {
    try {
      const last7Days = await this.getProductSalesLast7Days(productId);
      const trend = last7Days.map(day => day.sales);
      
      const isIncreasing = trend[trend.length - 1] > trend[0];
      const percentChange = ((trend[trend.length - 1] - trend[0]) / trend[0]) * 100;

      return {
        direction: isIncreasing ? 'up' : 'down',
        percentChange: Math.round(percentChange),
        velocity: Math.abs(percentChange / 7),
      };
    } catch (error) {
      return { direction: 'stable', percentChange: 0, velocity: 0 };
    }
  }

  // 🔗 API Helper Methods
  async fetchShopifySales(date) {
    // Implementation depends on your Shopify setup
    return [];
  }

  async fetchAllProducts() {
    return [];
  }

  async fetchAllOrders() {
    return [];
  }

  async getProductSales(productId) {
    return [];
  }

  async getProductSalesLast7Days(productId) {
    return [];
  }
}

module.exports = SalesAnalyzer;
