/**
 * 🔄 Inventory Sync - Keep stock levels synchronized
 */

const cron = require('node-cron');
const ShopifyAPI = require('../integrations/shopify-api');

class InventorySync {
  constructor() {
    this.shopify = new ShopifyAPI();
    this.syncInterval = '0 */4 * * *'; // Every 4 hours
  }

  /**
   * 🚀 Start auto-sync
   */
  startAutoSync() {
    console.log('🚀 Starting inventory auto-sync...');
    
    cron.schedule(this.syncInterval, async () => {
      try {
        await this.syncInventory();
      } catch (error) {
        console.error('❌ Sync error:', error);
      }
    });
  }

  /**
   * 🔄 Sync all inventory
   */
  async syncInventory() {
    try {
      console.log('🔄 Syncing inventory levels...');
      
      const products = await this.shopify.getProducts();
      let syncedCount = 0;

      for (const product of products) {
        const optimized = await this.getOptimizedInventory(product);
        
        if (optimized.needsUpdate) {
          await this.updateProductInventory(product, optimized);
          syncedCount++;
        }
      }

      console.log(`✅ Synced ${syncedCount} products`);
      return { synced: syncedCount, timestamp: new Date() };
    } catch (error) {
      console.error('❌ Sync failed:', error);
      throw error;
    }
  }

  /**
   * 📊 Get optimized inventory levels
   */
  async getOptimizedInventory(product) {
    try {
      const currentStock = product.variants[0].inventory_quantity;
      const avgDailySales = await this.getAverageDailySales(product.id);
      const leadTime = 21; // Alibaba lead time
      
      const optimalStock = avgDailySales * (leadTime + 14); // 2 weeks buffer
      const reorderPoint = avgDailySales * leadTime;

      return {
        productId: product.id,
        currentStock,
        optimalStock: Math.ceil(optimalStock),
        reorderPoint: Math.ceil(reorderPoint),
        needsUpdate: Math.abs(currentStock - optimalStock) > avgDailySales * 3,
      };
    } catch (error) {
      return { needsUpdate: false };
    }
  }

  /**
   * 📈 Get average daily sales
   */
  async getAverageDailySales(productId) {
    try {
      // Query last 30 days of sales
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const orders = await this.shopify.getSalesData(thirtyDaysAgo, new Date());
      
      let totalSales = 0;
      orders.forEach(order => {
        totalSales += order.line_items.filter(item => item.product_id === productId).length;
      });

      return totalSales / 30; // Average per day
    } catch (error) {
      return 10; // Default fallback
    }
  }

  /**
   * 🔗 Update product inventory
   */
  async updateProductInventory(product, optimized) {
    try {
      const variance = optimized.optimalStock - optimized.currentStock;
      
      if (variance !== 0) {
        console.log(`📦 Updating ${product.title} by ${variance} units`);
        await this.shopify.updateInventory(
          product.variants[0].id,
          variance
        );
      }
    } catch (error) {
      console.error('❌ Error updating inventory:', error);
    }
  }
}

module.exports = InventorySync;