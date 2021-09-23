const passport = require('passport');
const fs = require('fs');

const privateKey = fs.readFileSync('./assets/sp.pem', 'utf-8');
export default () => {
    const SamlStrategy = require('passport-saml').Strategy;
    const authStrategy = new SamlStrategy({
        path: '/auth/assertion-conumser-service',
        entryPoint: '<identity-provider-sso-endpoint>',
        issuer: '<service-provider-issuer>',
        cert: '<identity-provider-certificate>',
        signatureAlgorithm: 'sha256',
        digestAlgorithm: 'sha256',
        // privateKey: privateKey, // not this
        // decryptionPvk: privateKey, // the correct field to provide decryption private key
    }, (profile: any, done: any) => {
        done(null, {
            username: profile.nameID,
            email: profile.nameID,
        });
    });
    passport.use(authStrategy);
    passport.serializeUser(function(user: any, done: any) {
        done(null, user);
    });
    passport.deserializeUser(function(id: any, done: any) {
        done(null, id);
    });
};