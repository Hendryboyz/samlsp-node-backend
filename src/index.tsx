import express, { 
    Application, 
    Request, 
    Response 
} from 'express';
import AuthRouter from './routes/auth.routes';
const bodyParser = require("body-parser");
const sessions = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// passport configuration
configurePassport();

// app setting
const app: Application = express();
app.use(express.static("public"));
const eightHours: number = 1000 * 60 * 60 * 8;
app.use(sessions({
    secret: "samlsptutorialsbyhenry",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: eightHours },
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user: any, done: any) {
    done(null, user);
});
passport.deserializeUser(function(id: any, done: any) {
    done(null, id);
});

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

function configurePassport() {
    const SamlStrategy = require('passport-saml').Strategy;
    const authStrategy = new SamlStrategy({
        path: '/auth/assertion-conumser-service',
        entryPoint: '<identity-provider-sso-endpoint>',
        issuer: '<service-provider-issuer>',
        cert: '<identity-provider-certificate>',
        signatureAlgorithm: 'sha256',
        digestAlgorithm: 'sha256'
    }, (profile: any, done: any) => {
        done(null, {
            username: profile.nameID,
            email: profile.nameID,
        });
    });
    passport.use(authStrategy);

};