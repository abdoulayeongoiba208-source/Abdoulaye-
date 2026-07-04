/**
 * 📊 Advanced Analytics Engine - Deep insights & reporting
 */

const { Product, Order, Analytics, Customer } = require('../models');
const { OpenAI } = require('openai');

class AdvancedAnalytics {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * 📈 Generate Comprehensive Report
   */
  async generateComprehensiveReport(dateRange = 30) {
    try {
      console.log('📊 Generating comprehensive report...');

      const startDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000);
      const orders = await Order.find({ createdAt: { $gte: startDate } });
      const products = await Product.find();

      const report = {
        period: `${dateRange} days`,
        revenue: {
          total: orders.reduce((sum, o) => sum + o.totalPrice, 0),
          average: orders.length > 0 ? orders.reduce((sum, o) => sum + o.totalPrice, 0) / orders.length : 0,
          highest: Math.max(...orders.map(o => o.totalPrice), 0),
        },
        orders: {
          total: orders.length,
          average_per_day: orders.length / dateRange,
          status_breakdown: this.getStatusBreakdown(orders),
        },
        products: {
          total: products.length,
          top_performers: await this.getTopPerformers(products, 10),
          low_performers: await this.getLowPerformers(products, 10),
        },
        customers: {
          total: await Customer.countDocuments(),
          repeat_rate: await this.getRepeatCustomerRate(orders),
          lifetime_value: await this.getAverageLifetimeValue(),
        },
      };

      // Get AI insights
      report.insights = await this.generateInsights(report);

      return report;
    } catch (error) {
      console.error('❌ Report generation failed:', error);
      throw error;
    }
  }

  /**
   * 💰 ROI Analysis
   */
  async analyzeROI() {
    try {
      const products = await Product.find();
      const roiAnalysis = [];

      for (const product of products) {
        const cost = product.cost || product.price * 0.4;
        const revenue = product.metrics.profit || 0;
        const roi = ((revenue - cost) / cost) * 100;

        roiAnalysis.push({
          productId: product._id,
          name: product.title,
          cost,
          revenue,
          roi: Math.round(roi),
          profitMargin: Math.round(((product.price - cost) / product.price) * 100),
        });
      }

      return roiAnalysis.sort((a, b) => b.roi - a.roi);
    } catch (error) {
      console.error('❌ ROI analysis failed:', error);
      return [];
    }
  }

  /**
   * 🎯 Customer Segmentation
   */
  async segmentCustomers() {
    try {
      console.log('🎯 Segmenting customers...');

      const customers = await Customer.find();
      const segments = {
        vip: [],
        loyal: [],
        occasional: [],
        inactive: [],
      };

      for (const customer of customers) {
        if (customer.totalSpent > 1000) {
          segments.vip.push(customer);
        } else if (customer.totalOrders > 5) {
          segments.loyal.push(customer);
        } else if (customer.totalOrders > 1) {
          segments.occasional.push(customer);
        } else {
          segments.inactive.push(customer);
        }
      }

      return {
        vip: { count: segments.vip.length, avgSpent: this.avgSpent(segments.vip) },
        loyal: { count: segments.loyal.length, avgSpent: this.avgSpent(segments.loyal) },
        occasional: { count: segments.occasional.length, avgSpent: this.avgSpent(segments.occasional) },
        inactive: { count: segments.inactive.length, avgSpent: this.avgSpent(segments.inactive) },
      };
    } catch (error) {
      console.error('❌ Segmentation failed:', error);
      return {};
    }
  }

  /**
   * 🔮 Churn Prediction
   */
  async predictChurn() {
    try {
      console.log('🔮 Predicting customer churn...');

      const customers = await Customer.find();
      const churnRisk = [];

      for (const customer of customers) {
        const daysSinceLastOrder = Math.floor(
          (new Date() - new Date(customer.lastOrderDate)) / (1000 * 60 * 60 * 24)
        );

        let riskScore = 0;

        if (daysSinceLastOrder > 90) riskScore += 50;
        if (daysSinceLastOrder > 30) riskScore += 30;
        if (customer.totalOrders === 1) riskScore += 40;

        if (riskScore > 50) {
          churnRisk.push({
            customerId: customer._id,
            email: customer.email,
            riskScore,
            lastOrder: customer.lastOrderDate,
          });
        }
      }

      return churnRisk.sort((a, b) => b.riskScore - a.riskScore);
    } catch (error) {
      console.error('❌ Churn prediction failed:', error);
      return [];
    }
  }

  /**
   * 🎨 Cohort Analysis
   */
  async cohortAnalysis() {
    try {
      const cohorts = {};
      const orders = await Order.find().sort({ createdAt: 1 });

      for (const order of orders) {
        const cohort = order.createdAt.toISOString().split('T')[0];
        if (!cohorts[cohort]) cohorts[cohort] = { orders: 0, revenue: 0, customers: new Set() };
        cohorts[cohort].orders++;
        cohorts[cohort].revenue += order.totalPrice;
        cohorts[cohort].customers.add(order.customerId);
      }

      // Convert to array
      return Object.entries(cohorts).map(([date, data]) => ({
        date,
        orders: data.orders,
        revenue: data.revenue,
        customers: data.customers.size,
        aov: data.revenue / data.orders,
      }));
    } catch (error) {
      console.error('❌ Cohort analysis failed:', error);
      return [];
    }
  }

  // Helper methods
  getStatusBreakdown(orders) {
    const breakdown = {};
    for (const order of orders) {
      breakdown[order.status] = (breakdown[order.status] || 0) + 1;
    }
    return breakdown;
  }

  async getTopPerformers(products, limit = 10) {
    return products
      .sort((a, b) => (b.metrics.roi || 0) - (a.metrics.roi || 0))
      .slice(0, limit)
      .map(p => ({
        name: p.title,
        sales: p.metrics.dailySales,
        roi: p.metrics.roi,
      }));
  }

  async getLowPerformers(products, limit = 10) {
    return products
      .sort((a, b) => (a.metrics.roi || 0) - (b.metrics.roi || 0))
      .slice(0, limit)
      .map(p => ({
        name: p.title,
        sales: p.metrics.dailySales,
        roi: p.metrics.roi,
      }));
  }

  async getRepeatCustomerRate(orders) {
    const customerOrders = {};
    for (const order of orders) {
      customerOrders[order.customerId] = (customerOrders[order.customerId] || 0) + 1;
    }
    const repeatCount = Object.values(customerOrders).filter(count => count > 1).length;
    return ((repeatCount / Object.keys(customerOrders).length) * 100).toFixed(2);
  }

  async getAverageLifetimeValue() {
    const customers = await Customer.find();
    if (customers.length === 0) return 0;
    const totalSpent = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
    return (totalSpent / customers.length).toFixed(2);
  }

  avgSpent(customers) {
    if (customers.length === 0) return 0;
    const total = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
    return (total / customers.length).toFixed(2);
  }

  async generateInsights(report) {
    try {
      const prompt = `Analyze this e-commerce report and provide 5 key insights:\n${JSON.stringify(report, null, 2)}`;
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert e-commerce analyst. Provide actionable insights.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
      });
      return response.choices[0].message.content;
    } catch (error) {
      return 'Insights generation in progress...';
    }
  }
}

module.exports = AdvancedAnalytics;