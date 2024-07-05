const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const indexRoute = require("./routes/index.route");
const sendResponse = require("./config/response.config");

// Passport configuration
// require("./config/auth.config");

// Create Express server
const app = express();

// Express configuration
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Express configuration
app.use(helmet());

// Disable x-powered-by header
app.disable("x-powered-by");

// Compress response
app.use(compression());

app.get("/", (req, res) => {
  sendResponse(req, res, 200, { message: "ok" });
});

// mount routes
app.use(indexRoute);

// custom 404
app.use((req, res, next) => {
  sendResponse(req, res, 404, {}, "E0001", "Not found", "Not found");
  next();
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  sendResponse(
    req,
    res,
    statusCode,
    {},
    "E0002",
    err.statusCode ? err.message : "Internal Server Error",
    err.message
  );
  next();
});

module.exports = app;
