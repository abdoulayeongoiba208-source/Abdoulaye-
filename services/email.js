/**
 * 📧 Email Service - Send transactional emails
 */

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * 📧 Send Order Confirmation
   */
  async sendOrderConfirmation(customer, order) {
    const html = `
      <h2>✅ Order Confirmed!</h2>
      <p>Hi ${customer.name},</p>
      <p>Your order #${order.id} has been confirmed.</p>
      <table>
        <tr><th>Item</th><th>Price</th><th>Qty</th></tr>
        ${order.items.map(i => `
          <tr>
            <td>${i.name}</td>
            <td>$${i.price}</td>
            <td>${i.quantity}</td>
          </tr>
        `).join('')}
      </table>
      <p><strong>Total: $${order.total}</strong></p>
      <p>Tracking: ${order.tracking || 'Coming soon'}</p>
    `;

    return this.send(customer.email, '✅ Order Confirmed', html);
  }

  /**
   * 📦 Send Shipping Notification
   */
  async sendShippingNotification(customer, tracking) {
    const html = `
      <h2>📦 Order Shipped!</h2>
      <p>Hi ${customer.name},</p>
      <p>Your order is on its way!</p>
      <p><strong>Tracking: ${tracking.number}</strong></p>
      <p>Estimated Delivery: ${tracking.date}</p>
      <p>Carrier: ${tracking.carrier}</p>
    `;

    return this.send(customer.email, '📦 Order Shipped', html);
  }

  /**
   * 💝 Send Abandoned Cart Email
   */
  async sendAbandonedCart(customer, cart, discount = 10) {
    const total = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const discountedTotal = total * (1 - discount / 100);

    const html = `
      <h2>⏰ You Left Items in Your Cart!</h2>
      <p>Hi ${customer.name},</p>
      <p>Complete your purchase and get <strong>${discount}% OFF</strong>!</p>
      <table>
        ${cart.items.map(i => `
          <tr>
            <td>${i.name} x${i.quantity}</td>
            <td>$${(i.price * i.quantity).toFixed(2)}</td>
          </tr>
        `).join('')}
      </table>
      <p>Original Total: $${total.toFixed(2)}</p>
      <p><strong style="color: green;">With Discount: $${discountedTotal.toFixed(2)}</strong></p>
      <a href="https://yourstore.com/checkout">Complete Purchase Now →</a>
    `;

    return this.send(customer.email, '💝 Complete Your Purchase', html);
  }

  /**
   * ⭐ Send Product Review Request
   */
  async sendReviewRequest(customer, product) {
    const html = `
      <h2>⭐ How was your ${product.name}?</h2>
      <p>Hi ${customer.name},</p>
      <p>We'd love to hear your feedback!</p>
      <p><a href="https://yourstore.com/review/${product.id}">Leave a Review →</a></p>
    `;

    return this.send(customer.email, '⭐ Leave a Review', html);
  }

  /**
   * 📨 Generic Send
   */
  async send(to, subject, html) {
    try {
      const result = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      console.log(`📧 Email sent to ${to}`);
      return result;
    } catch (error) {
      console.error('❌ Email send error:', error);
      throw error;
    }
  }
}

module.exports = EmailService;