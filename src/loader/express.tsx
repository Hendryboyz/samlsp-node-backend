import express, {
    Application,
    Request,
    Response,
} from 'express';
import AuthRouter from '../routes/auth.routes';

const bodyParser = require("body-parser");
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');


type expressLoaderOptions = {
    app: Application;
};

export default ({ app } : expressLoaderOptions) => {
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

    // routing
    app.use('/auth', AuthRouter);
    app.use('*', (_: Request, response: Response) => {
        response.status(404).json({
            message: 'fallback url'
        });
    });
};