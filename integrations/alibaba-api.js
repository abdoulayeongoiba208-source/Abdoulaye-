/**
 * 🚚 Alibaba/AliExpress Integration - Sourcing automation
 */

const axios = require('axios');

class AlibabaAPI {
  constructor() {
    this.apiKey = process.env.ALIBABA_API_KEY;
    this.apiSecret = process.env.ALIBABA_API_SECRET;
    this.baseURL = 'https://api.alibaba.com/v1';
  }

  /**
   * 🔍 Search products on Alibaba
   */
  async searchProducts(keyword, filters = {}) {
    try {
      console.log(`🔍 Searching Alibaba for: ${keyword}...`);
      
      const response = await axios.get(
        `${this.baseURL}/products/search`,
        {
          params: {
            keywords: keyword,
            pageNumber: filters.page || 1,
            pageSize: filters.limit || 50,
            ...filters,
          },
        }
      );

      return response.data.products || [];
    } catch (error) {
      console.error('❌ Error searching products:', error);
      return [];
    }
  }

  /**
   * 💰 Get price comparison
   */
  async comparePrices(productName, quantity = 100) {
    try {
      console.log(`💰 Comparing prices for ${productName}...`);
      
      const products = await this.searchProducts(productName);
      
      return products
        .slice(0, 10)
        .map(p => ({
          supplier: p.company_name,
          price: p.min_order_amount || 0,
          moq: p.min_order_quantity || 1,
          leadTime: p.delivery_days || 30,
          rating: p.seller_positive_feedback_rate || 0,
          reviews: p.review_count || 0,
        }))
        .sort((a, b) => a.price - b.price);
    } catch (error) {
      console.error('❌ Error comparing prices:', error);
      return [];
    }
  }

  /**
   * 🎁 Find trending products
   */
  async findTrendingProducts(category = 'electronics', limit = 20) {
    try {
      console.log(`🎁 Finding trending products in ${category}...`);
      
      const response = await axios.get(`${this.baseURL}/products/trending`, {
        params: {
          category,
          limit,
          sortBy: 'sales',
        },
      });

      return response.data.products || [];
    } catch (error) {
      console.error('❌ Error finding trending products:', error);
      return [];
    }
  }

  /**
   * 📦 Get supplier details
   */
  async getSupplierDetails(supplierId) {
    try {
      const response = await axios.get(
        `${this.baseURL}/suppliers/${supplierId}`
      );
      return response.data.supplier;
    } catch (error) {
      console.error('❌ Error getting supplier details:', error);
      return null;
    }
  }

  /**
   * ✅ Validate product for dropshipping
   */
  async validateProduct(productId) {
    try {
      console.log(`✅ Validating product ${productId}...`);
      
      const product = await axios.get(
        `${this.baseURL}/products/${productId}`
      );

      const p = product.data.product;

      return {
        valid: true,
        profitPotential: this.calculateProfitPotential(p),
        demandScore: p.review_count > 100 ? 'high' : 'medium',
        supplierReliability: p.seller_positive_feedback_rate || 0,
        minimumMargin: ((p.market_price - p.cost_price) / p.market_price) * 100,
      };
    } catch (error) {
      console.error('❌ Error validating product:', error);
      return { valid: false };
    }
  }

  calculateProfitPotential(product) {
    const margin = product.market_price - product.cost_price;
    const roi = (margin / product.cost_price) * 100;
    return Math.round(roi);
  }
}

module.exports = AlibabaAPI;