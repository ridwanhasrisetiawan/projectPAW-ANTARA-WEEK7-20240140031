const User = require('../models/user.model');
const { sendSuccess, sendError } = require('../utils/ApiResponse');

const authController = {
  /**
   * POST /api/auth/login
   */
  login(req, res) {
    try {
      const { email, password } = req.body;

      // Validasi ringan
      if (!email || !password) {
        return sendError(res, {
          statusCode: 400,
          message: 'Email dan password wajib diisi',
        });
      }

      // Cari user
      const user = User.findByEmail(email);
      if (!user) {
        return sendError(res, {
          statusCode: 401,
          message: 'Email atau password salah',
        });
      }

      // Cek password
      const isPasswordValid = User.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return sendError(res, {
          statusCode: 401,
          message: 'Email atau password salah',
        });
      }

      return sendSuccess(res, {
        statusCode: 200,
        message: 'Login berhasil',
        data: { user: User.toSafeObject(user) },
      });
    } catch (error) {
      return sendError(res, {
        statusCode: 500,
        message: 'Terjadi kesalahan pada server',
        errors: error.message,
      });
    }
  },

  /**
   * POST /api/auth/register
   */
  register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validasi ringan: field wajib
      if (!name || !email || !password) {
        return sendError(res, {
          statusCode: 400,
          message: 'Nama, email, dan password wajib diisi',
        });
      }

      // Validasi ringan: format email sederhana
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendError(res, {
          statusCode: 400,
          message: 'Format email tidak valid',
        });
      }

      // Validasi ringan: panjang password minimal
      if (password.length < 8) {
        return sendError(res, {
          statusCode: 400,
          message: 'Password minimal 8 karakter',
        });
      }

      // Cek apakah email sudah terdaftar
      const existingUser = User.findByEmail(email);
      if (existingUser) {
        return sendError(res, {
          statusCode: 409,
          message: 'Email sudah terdaftar',
        });
      }

      // Buat user baru (User.create sudah menangani hash password)
      const newUser = User.create({ name, email, password });

      return sendSuccess(res, {
        statusCode: 201,
        message: 'Registrasi berhasil',
        data: { user: User.toSafeObject(newUser) },
      });
    } catch (error) {
      return sendError(res, {
        statusCode: 500,
        message: 'Terjadi kesalahan pada server',
        errors: error.message,
      });
    }
  },
};

module.exports = authController;
