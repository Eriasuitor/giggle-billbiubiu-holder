const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    async willReady() {
        this.app.passport.use(
            new JwtStrategy({
                secretOrKey: this.app.config.jwt.key,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            }, (payload, done) => {
                console.log(payload)
                done(null, { username: payload.username })
            })
        )
    }
}

module.exports = AppBootHook;