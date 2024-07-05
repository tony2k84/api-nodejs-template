const logger = require("../config/logger.config").getLogger("cache.service");
let cache = {};
function getFromCache(key) {
  const value = cache[key];
  if (value) {
    logger.trace("cache hit");
  } else {
    logger.trace("cache miss");
  }
  return cache[key];
}

function setInCache(key, value) {
  cache[key] = value;
  logger.trace("cache set");
}

module.exports = {
  getFromCache,
  setInCache,
};
