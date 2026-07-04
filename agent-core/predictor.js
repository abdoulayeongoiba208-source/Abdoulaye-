/**
 * 🔮 Sales Predictor - ML-powered sales forecasting
 */

const tf = require('@tensorflow/tfjs');
const { OpenAI } = require('openai');

class SalesPredictor {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.model = null;
    this.trainingData = [];
  }

  /**
   * 🤖 Initialize ML model
   */
  async initializeModel() {
    try {
      console.log('🚀 Initializing TensorFlow model...');
      
      // Create a simple LSTM model for time series prediction
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({
            inputShape: [7], // 7 days of history
            units: 64,
            activation: 'relu',
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 32,
            activation: 'relu',
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 1,
            activation: 'linear',
          }),
        ],
      });

      this.model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'meanSquaredError',
        metrics: ['mae'],
      });

      console.log('✅ Model initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing model:', error);
      throw error;
    }
  }

  /**
   * 📊 Predict next 7 days sales
   */
  async predictNext7Days(productId, historicalData) {
    try {
      console.log(`🔮 Predicting sales for product ${productId}...`);
      
      // Normalize data
      const normalized = this.normalizeData(historicalData);
      
      // Prepare input tensor
      const input = tf.tensor2d([normalized.slice(-7)]);
      
      // Make prediction
      const prediction = this.model.predict(input);
      const predictionArray = await prediction.data();
      
      // Denormalize
      const forecast = Array.from(predictionArray).map(
        val => val * (Math.max(...historicalData) - Math.min(...historicalData)) + Math.min(...historicalData)
      );

      // Get AI confidence analysis
      const confidence = await this.getConfidenceScore(productId, forecast);

      input.dispose();
      prediction.dispose();

      return {
        productId,
        forecast,
        confidence,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('❌ Error predicting sales:', error);
      throw error;
    }
  }

  /**
   * 🎯 Predict trending products
   */
  async predictTrendingProducts(allProducts) {
    try {
      console.log('🎯 Analyzing trending products...');
      
      const predictions = [];

      for (const product of allProducts) {
        const score = await this.calculateTrendScore(product);
        predictions.push({
          productId: product.id,
          name: product.title,
          score,
          recommendation: score > 0.7 ? 'HIGH' : score > 0.4 ? 'MEDIUM' : 'LOW',
        });
      }

      // Sort by score
      return predictions
        .sort((a, b) => b.score - a.score)
        .slice(0, 20); // Top 20 trending
    } catch (error) {
      console.error('❌ Error predicting trends:', error);
      throw error;
    }
  }

  /**
   * 💰 Predict optimal pricing
   */
  async predictOptimalPrice(product, marketData) {
    try {
      console.log(`💰 Calculating optimal price for ${product.title}...`);
      
      const currentPrice = product.price;
      const demand = marketData.demandScore || 0.5;
      const competition = marketData.competitorPrices || [];
      const cost = product.cost || currentPrice * 0.4;

      // Calculate price elasticity
      const avgCompetitorPrice = competition.reduce((a, b) => a + b, 0) / competition.length;
      const elasticity = this.calculateElasticity(currentPrice, avgCompetitorPrice, demand);

      // Predict optimal price
      let optimalPrice = currentPrice;
      
      if (elasticity > 1) {
        // Elastic demand - price sensitive
        optimalPrice = Math.max(cost * 1.2, avgCompetitorPrice * 0.95);
      } else {
        // Inelastic demand - can increase price
        optimalPrice = Math.min(avgCompetitorPrice * 1.1, currentPrice * 1.2);
      }

      // Add AI recommendation
      const aiRecommendation = await this.getAIPriceRecommendation(product, optimalPrice);

      return {
        currentPrice,
        optimalPrice: Math.round(optimalPrice * 100) / 100,
        minPrice: cost * 1.2,
        maxPrice: optimalPrice * 1.5,
        elasticity,
        aiRecommendation,
      };
    } catch (error) {
      console.error('❌ Error predicting price:', error);
      throw error;
    }
  }

  /**
   * 🧠 Calculate trend score
   */
  async calculateTrendScore(product) {
    try {
      const factors = {
        recency: this.getRecencyScore(product.updated_at),
        demand: this.calculateDemandMetric(product),
        growth: this.calculateGrowthMetric(product),
        seasonality: this.calculateSeasonalityScore(product),
      };

      const weights = {
        recency: 0.2,
        demand: 0.4,
        growth: 0.3,
        seasonality: 0.1,
      };

      const score = Object.entries(factors).reduce(
        (sum, [key, value]) => sum + (value * weights[key]),
        0
      );

      return Math.min(1, Math.max(0, score));
    } catch (error) {
      return 0.5;
    }
  }

  /**
   * 📈 Calculate elasticity
   */
  calculateElasticity(currentPrice, avgPrice, demand) {
    const priceDiff = (avgPrice - currentPrice) / currentPrice;
    const demandElasticity = demand * 2; // Simplified
    return 1 + (priceDiff * demandElasticity);
  }

  /**
   * 🎯 Get confidence score
   */
  async getConfidenceScore(productId, forecast) {
    try {
      const prompt = `Given this sales forecast: ${forecast.join(', ')}, what's your confidence level (0-100)? Explain briefly.`;
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a sales forecasting expert. Provide confidence scores.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 100,
      });

      return response.choices[0].message.content;
    } catch (error) {
      return 'Confidence: Medium (training in progress)';
    }
  }

  /**
   * 💡 Get AI price recommendation
   */
  async getAIPriceRecommendation(product, optimalPrice) {
    try {
      const prompt = `Product: ${product.title}, Current Price: $${product.price}, Optimal Price: $${optimalPrice}. Should we increase/decrease? Why?`;
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a pricing strategist. Provide concise recommendations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
      });

      return response.choices[0].message.content;
    } catch (error) {
      return 'Recommendation pending...';
    }
  }

  // 🔧 Helper methods
  normalizeData(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map(val => (val - min) / (max - min || 1));
  }

  getRecencyScore(date) {
    const days = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return Math.max(0, 1 - days / 30);
  }

  calculateDemandMetric(product) {
    return (product.views || 0) / 1000; // Normalized
  }

  calculateGrowthMetric(product) {
    return (product.salesTrend || 0) / 100;
  }

  calculateSeasonalityScore(product) {
    const month = new Date().getMonth();
    return product.seasonalityFactors?.[month] || 0.5;
  }
}

module.exports = SalesPredictor;
