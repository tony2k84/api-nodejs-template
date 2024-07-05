const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const sendResponse = require("../config/response.config");
const { getFromCache, setInCache } = require("../services/cache.service");
const logger = require("../config/logger.config").getLogger("auth.middleware");

const getKey = (jwksUri, kid) => {
  logger.debug(jwksUri, kid, "getKey");
  return new Promise((resolve, reject) => {
    const keyFromCache = getFromCache("kidKey");
    if (keyFromCache) {
      resolve(keyFromCache);
    }
    const client = jwksClient({ jwksUri });
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        reject(err);
      }
      setInCache("kidKey", key.publicKey || key.rsaPublicKey);
      resolve(key.publicKey || key.rsaPublicKey);
    });
  });
};

const isAuthenticated = async function (req, res, next) {
  logger.debug("isAuthenticated start");

  // get jwt token
  const token = req.headers.authorization;

  if (!token) {
    logger.error("Unauthorized");
    sendResponse(req, res, 401, null, "E0003", "Unauthorized", "Unauthorized");
    return;
  }

  // parse token
  const jwtToken = token.replace("Bearer ", "");

  const decodedJWT = jwt.decode(jwtToken, { complete: true });
  logger.debug("token decoded");

  // verify
  try {
    const key = await getKey(
      `${decodedJWT.payload.iss}.well-known/jwks.json`,
      decodedJWT.header.kid
    );
    const verifiedToken = jwt.verify(jwtToken, key);

    if (!verifiedToken) {
      sendResponse(
        req,
        res,
        401,
        null,
        "E0003",
        "Unauthorized",
        "Unauthorized"
      );
      return;
    }

    logger.debug("token verified");
  } catch (err) {
    logger.error("Unauthorized");
    sendResponse(req, res, 401, null, "E0004", "Unauthorized", err.message);
    return;
  }

  logger.debug("isAuthenticated completed");
  next();
};

module.exports = isAuthenticated;
