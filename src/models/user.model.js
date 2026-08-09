const bcrypt = require('bcryptjs');
const db = require('../config/database');

const SALT_ROUNDS = 10;

const User = {
  /**
   * Cari user berdasarkan email
   * @param {string} email
   * @returns {object|undefined}
   */
  findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  },

  /**
   * Cari user berdasarkan id
   * @param {number} id
   * @returns {object|undefined}
   */
  findById(id) {
    const stmt = db.prepare(
      'SELECT id, name, email, created_at FROM users WHERE id = ?'
    );
    return stmt.get(id);
  },

  /**
   * Buat user baru (password otomatis di-hash)
   * @param {{ name: string, email: string, password: string }} payload
   * @returns {object} user yang baru dibuat (tanpa password)
   */
  create({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const stmt = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    );
    const info = stmt.run(name, email, hashedPassword);

    return this.findById(info.lastInsertRowid);
  },

  /**
   * Bandingkan password plain dengan hash yang tersimpan
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  },

  /**
   * Buang field password sebelum dikirim ke response
   * @param {object} user
   */
  toSafeObject(user) {
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },
};

module.exports = User;
