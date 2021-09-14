import express, { 
    Application, 
    Request, 
    Response 
} from 'express';
import AuthRouter from './routes/auth.routes';
const bodyParser = require("body-parser");
const session = require('express-session');

// passport configuration
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const authStrategy = new SamlStrategy({
    path: '/auth/assertion-conumser-service',
    entryPoint: '<identity-provider-sso-endpoint>',
    issuer: '<service-provider-issuer>',
    cert: '<identity-provider-certificate>',
    signatureAlgorithm: 'sha256',
    digestAlgorithm: 'sha256'
}, (profile: any, done: any) => {
    console.log(profile);
    done(null, {});
});
passport.use(authStrategy);

// app setting
const app: Application = express();
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/auth', AuthRouter);
app.use('*', (_: Request, response: Response) => {
    response.status(404).json({
        message: 'fallback url'
    });
});

const port = 4001;

try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch(error: any) {
    console.error(`Error occured: ${error.message}`);
}

