import { application, Router } from "express"

const authRouter = Router();
// https://www.passportjs.org/packages/passport-azure-ad/

var options = {
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    validateIssuer: config.creds.validateIssuer,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    isB2C: config.creds.isB2C,
    policyName: config.creds.policyName,
    allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
    audience: config.creds.audience,
    loggingLevel: config.creds.loggingLevel,
    loggingNoPII: config.creds.loggingNoPII,
    clockSkew: config.creds.clockSkew,
    scope: config.creds.scope
};

var bearerStrategy = new BearerStrategy(options,
    function (token, done) {
        log.info('verifying the user');
        log.info(token, 'was the token retreived');
        findById(token.oid, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                // "Auto-registration"
                log.info('User was added automatically as they were new. Their oid is: ', token.oid);
                users.push(token);
                owner = token.oid;
                return done(null, token);
            }
            owner = token.oid;
            return done(null, user, token);
        });
    }
);

const bearerStrategy = new BearerStrategy(options, (token, done) => {
    // Send user info using the second argument
    done(null, {}, token);
});

authRouter.use(passport.authenticate('oauth-bearer', { session: false }))
authRouter.use((req, res, next) => {
    console.log(req.authInfo);
});