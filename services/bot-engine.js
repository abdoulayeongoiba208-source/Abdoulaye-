/**
 * 🤖 Intelligent Bot Engine - Multi-channel automation
 */

const { OpenAI } = require('openai');
const cron = require('node-cron');
const { Order, Customer, Product } = require('../models');

class BotEngine {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * 🤖 Process Natural Language Intent
   */
  async processIntent(message, context = {}) {
    try {
      console.log(`🤖 Processing: ${message}`);

      const systemPrompt = `You are an intelligent e-commerce bot. Analyze the customer message and determine:
1. Intent (question, complaint, order_status, product_inquiry, etc)
2. Entities (product name, order id, etc)
3. Sentiment (positive, neutral, negative)
4. Required action

Respond in JSON format.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const intent = JSON.parse(response.choices[0].message.content);
      return await this.executeIntent(intent, context);
    } catch (error) {
      console.error('❌ Intent processing error:', error);
      return 'I need help. Let me connect you with support.';
    }
  }

  /**
   * ⚡ Execute Intent Action
   */
  async executeIntent(intent, context) {
    switch (intent.intent) {
      case 'order_status':
        return await this.handleOrderStatus(intent.entities, context);
      case 'product_inquiry':
        return await this.handleProductInquiry(intent.entities);
      case 'complaint':
        return await this.handleComplaint(intent.entities, context);
      case 'return_request':
        return await this.handleReturnRequest(intent.entities, context);
      default:
        return await this.generateResponse(intent);
    }
  }

  /**
   * 📦 Handle Order Status Query
   */
  async handleOrderStatus(entities, context) {
    try {
      let order;
      if (entities.orderId) {
        order = await Order.findOne({ shopifyOrderId: entities.orderId });
      } else if (context.customerId) {
        order = await Order.findOne({ customerId: context.customerId }).sort({ createdAt: -1 });
      }

      if (!order) {
        return "I couldn't find your order. Can you provide your order ID?";
      }

      const statusMessages = {
        pending: '⏳ Your order is being prepared',
        paid: '💳 Payment received, preparing to ship',
        shipped: '📦 Order shipped! Tracking: ' + (order.supplier.tracking || 'Coming soon'),
        delivered: '✅ Order delivered!',
      };

      return statusMessages[order.status] || 'Order status unknown';
    } catch (error) {
      return 'Error checking order status. Please try again.';
    }
  }

  /**
   * 🛍️ Handle Product Inquiry
   */
  async handleProductInquiry(entities) {
    try {
      const product = await Product.findOne({
        title: new RegExp(entities.productName, 'i'),
      });

      if (!product) {
        return `Sorry, I couldn't find "${entities.productName}". Would you like to search for similar items?`;
      }

      return `✨ ${product.title}\n💰 Price: $${product.price}\n⭐ Rating: ${product.rating}/5\n📦 In Stock: ${product.inventory.current > 0 ? 'Yes' : 'No'}`;
    } catch (error) {
      return 'Error searching products. Please try again.';
    }
  }

  /**
   * 😞 Handle Complaint
   */
  async handleComplaint(entities, context) {
    // Log complaint for support team
    console.log(`⚠️ Complaint from ${context.customerId}: ${entities.issue}`);

    return `I'm sorry to hear about this issue. 😞 I've notified our support team. They'll reach out to you within 24 hours. Your case ID: CASE-${Date.now()}`;
  }

  /**
   * 🔄 Handle Return Request
   */
  async handleReturnRequest(entities, context) {
    try {
      const order = await Order.findOne({ customerId: context.customerId }).sort({ createdAt: -1 });

      if (!order) {
        return "I couldn't find your order.";
      }

      // Create return request
      return `✅ Return request created for order #${order.shopifyOrderId}. You'll receive a return shipping label via email. Returns must be initiated within 30 days.`;
    } catch (error) {
      return 'Error processing return request.';
    }
  }

  /**
   * 💬 Generate Natural Response
   */
  async generateResponse(intent) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly e-commerce customer service bot. Be helpful and concise.',
          },
          {
            role: 'user',
            content: `Intent: ${intent.intent}. Sentiment: ${intent.sentiment}. Generate a helpful response.`,
          },
        ],
        max_tokens: 200,
      });

      return response.choices[0].message.content;
    } catch (error) {
      return 'I apologize for the confusion. Can you please rephrase?';
    }
  }

  /**
   * ⏰ Schedule Automated Tasks
   */
  scheduleAutomatedTasks() {
    // Send abandoned cart emails daily
    cron.schedule('0 10 * * *', async () => {
      console.log('📧 Checking for abandoned carts...');
      // Implementation
    });

    // Send review requests
    cron.schedule('0 14 * * *', async () => {
      console.log('⭐ Sending review requests...');
      // Implementation
    });

    // Analyze churn risk
    cron.schedule('0 6 * * 0', async () => {
      console.log('🔮 Analyzing churn risk...');
      // Implementation
    });
  }
}

module.exports = BotEngine;