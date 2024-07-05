const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const jwksRsa = require("jwks-rsa");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: process.env.OAUTH2_ISSUER,
  secretOrKeyProvider: jwksRsa.passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // jwksUri: process.env.OAUTH2_JWTKURI,
  }),
};

passport.use(new JwtStrategy(opts, (jwt, done) => done(null, jwt)));
