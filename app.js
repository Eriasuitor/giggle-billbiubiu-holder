const BasicStrategy = require('passport-http').BasicStrategy;

class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    async willReady() {
        console.log('!!!!!!!!!!!!!!!!!')
        this.app.passport.use(new BasicStrategy(
            function (req, username, password, done) {
                const user = {
                    provider: 'local',
                    username: '1',
                    password
                }
                this.app.logger.debug('%s %s get user: %j', req.method, req.url, user);
                console.log("!!!!!!!????????????/")
                this.app.passport.doVerify(req, user, done);
            }))
           this.app.passport.verify(async (ctx, user) => {return true;});
    }
}

module.exports = AppBootHook;