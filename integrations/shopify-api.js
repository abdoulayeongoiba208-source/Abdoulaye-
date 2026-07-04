/**
 * 🛍️ Shopify Integration - Full API connectivity
 */

const axios = require('axios');

class ShopifyAPI {
  constructor() {
    this.store = process.env.SHOPIFY_STORE_NAME;
    this.accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
    this.baseURL = `https://${this.store}.myshopify.com/admin/api/2024-01`;
    this.headers = {
      'X-Shopify-Access-Token': this.accessToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * 📦 Get all products
   */
  async getProducts(limit = 250) {
    try {
      console.log('📦 Fetching Shopify products...');
      const response = await axios.get(`${this.baseURL}/products.json`, {
        headers: this.headers,
        params: { limit },
      });
      return response.data.products;
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      throw error;
    }
  }

  /**
   * 🛒 Get all orders
   */
  async getOrders(status = 'any', limit = 250) {
    try {
      console.log(`📋 Fetching Shopify orders (${status})...`);
      const response = await axios.get(`${this.baseURL}/orders.json`, {
        headers: this.headers,
        params: { status, limit },
      });
      return response.data.orders;
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      throw error;
    }
  }

  /**
   * ➕ Create new product
   */
  async createProduct(productData) {
    try {
      console.log(`✨ Creating product: ${productData.title}...`);
      const response = await axios.post(
        `${this.baseURL}/products.json`,
        { product: productData },
        { headers: this.headers }
      );
      return response.data.product;
    } catch (error) {
      console.error('❌ Error creating product:', error);
      throw error;
    }
  }

  /**
   * 📝 Update product
   */
  async updateProduct(productId, updates) {
    try {
      console.log(`📝 Updating product ${productId}...`);
      const response = await axios.put(
        `${this.baseURL}/products/${productId}.json`,
        { product: updates },
        { headers: this.headers }
      );
      return response.data.product;
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  }

  /**
   * 💰 Update inventory
   */
  async updateInventory(variantId, quantity) {
    try {
      console.log(`📦 Updating inventory for variant ${variantId}...`);
      const response = await axios.post(
        `${this.baseURL}/inventory_levels/adjust.json`,
        {
          inventory_item_id: variantId,
          available_adjustment: quantity,
          locations_country_code: ['US'],
        },
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Error updating inventory:', error);
      throw error;
    }
  }

  /**
   * 📊 Get sales data
   */
  async getSalesData(startDate, endDate) {
    try {
      const orders = await this.getOrders('any', 250);
      return orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
    } catch (error) {
      console.error('❌ Error getting sales data:', error);
      throw error;
    }
  }

  /**
   * 🔔 Setup webhooks
   */
  async setupWebhooks(topic, url) {
    try {
      console.log(`🔔 Setting up webhook for ${topic}...`);
      const response = await axios.post(
        `${this.baseURL}/webhooks.json`,
        {
          webhook: {
            topic,
            address: url,
            format: 'json',
          },
        },
        { headers: this.headers }
      );
      return response.data.webhook;
    } catch (error) {
      console.error('❌ Error setting up webhook:', error);
      throw error;
    }
  }
}

module.exports = ShopifyAPI;