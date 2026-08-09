function sendSuccess(res, { statusCode = 200, message = 'Success', data = null }) {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}

function sendError(res, { statusCode = 500, message = 'Error', errors = null }) {
  const body = {
    success: false,
    statusCode,
    message,
    timestamp: new Date().toISOString(),
  };

  if (errors) body.errors = errors;

  return res.status(statusCode).json(body);
}

module.exports = { sendSuccess, sendError };
