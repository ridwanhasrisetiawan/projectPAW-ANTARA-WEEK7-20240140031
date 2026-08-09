const { sendError } = require('../utils/ApiResponse');

function notFoundHandler(req, res, next) {
  return sendError(res, {
    statusCode: 404,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
}

// eslint-disable-next-line no-unused-vars
function globalErrorHandler(err, req, res, next) {
  console.error(err.stack);
  return sendError(res, {
    statusCode: err.statusCode || 500,
    message: err.message || 'Terjadi kesalahan pada server',
  });
}

module.exports = { notFoundHandler, globalErrorHandler };
