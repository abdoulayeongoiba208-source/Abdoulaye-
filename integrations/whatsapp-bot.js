/**
 * 💬 WhatsApp Bot - AI-powered customer engagement
 */

const twilio = require('twilio');
const { OpenAI } = require('openai');

class WhatsAppBot {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
    this.client = twilio(this.accountSid, this.authToken);
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * 📨 Send WhatsApp message
   */
  async sendMessage(toPhoneNumber, message) {
    try {
      console.log(`📨 Sending WhatsApp to ${toPhoneNumber}...`);
      
      const result = await this.client.messages.create({
        from: `whatsapp:${this.phoneNumber}`,
        to: `whatsapp:${toPhoneNumber}`,
        body: message,
      });

      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('❌ Error sending message:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 🤖 Get AI response for customer message
   */
  async getAIResponse(customerMessage, context = {}) {
    try {
      console.log(`🤖 Processing: ${customerMessage}`);
      
      const systemPrompt = `You are a helpful e-commerce customer service bot. You help customers with:
- Product information
- Pricing and availability
- Order status
- Shipping info
- Returns and refunds

Be concise, friendly, and helpful. Keep responses under 1000 characters for WhatsApp.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: customerMessage },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('❌ Error getting AI response:', error);
      return 'Sorry, I\'m having trouble processing your request. Please try again.';
    }
  }

  /**
   * 💳 Handle product inquiry
   */
  async handleProductInquiry(productName, customerPhone) {
    try {
      console.log(`🛍️ Handling inquiry for: ${productName}`);
      
      // Find product info
      const productInfo = await this.searchProduct(productName);
      
      if (!productInfo) {
        await this.sendMessage(customerPhone, `Sorry, we don't have "${productName}" in stock right now.`);
        return;
      }

      const message = `✨ *${productInfo.name}*\n\n💰 Price: $${productInfo.price}\n📦 In Stock: Yes\n⭐ Rating: ${productInfo.rating}/5\n\nWould you like to order?`;
      
      await this.sendMessage(customerPhone, message);
    } catch (error) {
      console.error('❌ Error handling inquiry:', error);
    }
  }

  /**
   * 🛒 Process order via WhatsApp
   */
  async processOrder(customerPhone, orderData) {
    try {
      console.log(`🛒 Processing order from ${customerPhone}...`);
      
      const orderMessage = `✅ *Order Confirmed*\n\nOrder ID: ${orderData.orderId}\nTotal: $${orderData.total}\nDelivery: ${orderData.shippingDays} days\n\nThank you!`;
      
      await this.sendMessage(customerPhone, orderMessage);
      return { success: true };
    } catch (error) {
      console.error('❌ Error processing order:', error);
      return { success: false };
    }
  }

  /**
   * 🔔 Send order notification
   */
  async notifyOrderStatus(customerPhone, orderId, status) {
    try {
      const statusMessages = {
        'pending': '⏳ Your order is being prepared...',
        'shipped': '📦 Your order has been shipped!',
        'delivered': '✅ Your order has been delivered!',
        'cancelled': '❌ Your order has been cancelled.',
      };

      const message = `${statusMessages[status] || 'Order updated'} \nOrder ID: ${orderId}`;
      await this.sendMessage(customerPhone, message);
    } catch (error) {
      console.error('❌ Error notifying order:', error);
    }
  }

  async searchProduct(productName) {
    // Placeholder - connect to your product database
    return {
      name: productName,
      price: 29.99,
      rating: 4.5,
    };
  }
}

module.exports = WhatsAppBot;