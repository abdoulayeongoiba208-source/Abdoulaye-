/**
 * 🔐 Authentication & JWT Management
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class AuthManager {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.jwtExpire = process.env.JWT_EXPIRE || '7d';
  }

  /**
   * 🔐 Generate JWT Token
   */
  generateToken(userId, role = 'user') {
    return jwt.sign(
      { userId, role, timestamp: Date.now() },
      this.jwtSecret,
      { expiresIn: this.jwtExpire }
    );
  }

  /**
   * ✅ Verify JWT Token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      return null;
    }
  }

  /**
   * 🔒 Hash Password
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * 🔓 Compare Passwords
   */
  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * 🔑 Generate API Key
   */
  generateAPIKey() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = AuthManager;