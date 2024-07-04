const pino = require("pino");

const pinoLogger = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  redact: {
    paths: ["*.password"],
    censor: "[REDACTED]",
  },
});

module.exports.getLogger = function (module = "default") {
  return pinoLogger.child({ module });
};
