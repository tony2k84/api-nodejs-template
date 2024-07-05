const logger = require("./logger.config").getLogger("response.common");

function sendResponse(req, res, status, body, code, reason, message) {
  // add headers
  res.header("X-CORRELATION-ID", req.headers["x-correlation-id"] || "");
  res.header("X-TRANSACTION-ID", req.headers["x-transaction-id"] || "");
  res.header("X-DATE-TIME", Date.now());
  res.header("X-EXTERNAL-ID", req.headers["x-external-id"] || "");

  logger.trace("response headers set");

  if (status > 299) {
    // error response
    res.status(status).json({
      code,
      reason,
      message,
      status,
    });
    return;
  }

  // send response
  res.status(status).json(body);
}

module.exports = sendResponse;
