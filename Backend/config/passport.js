const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const TravellerUser = mongoose.model('travellerUser');
const OwnerUser = mongoose.model('ownerUser');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            if (jwt_payload.type === "owner") {
                OwnerUser.findById(jwt_payload.id)
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        }
                        return done(null, false);
                    })
                    .catch(err => console.log(err));
            } else {
                TravellerUser.findById(jwt_payload.id)
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        }
                        return done(null, false);
                    })
                    .catch(err => console.log(err));
            }

        })
    );
};


