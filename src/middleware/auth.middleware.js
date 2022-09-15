const User = require("../models/user.model");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

  module.exports = (passport) => {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: "academlo", // debe estar en una variable de entorno
    };
    passport.use(
      new JwtStrategy(opts, async (decoded, done) => {
        try {
          const response = await userController.getUserById(decoded.id);
          if (!response) return done(null, false);
          console.log("decoded jwt", decoded);
          return done(null, decoded);
        } catch (error) {
          done(error.message);
        }
      })
    );
  };