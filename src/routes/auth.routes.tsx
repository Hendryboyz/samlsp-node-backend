import express, {
    Router,
    Request,
    Response
} from 'express';
import { AuthController } from '../controllers/auth.controller';
import { IsAuthenticatedSession } from '../middlewares/auth.middleware';
const passport = require('passport');
const bodyParser = require('body-parser');

const router: Router = express.Router();

router.route('/entrypoint').get(
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    (_: Request, response: Response) => {
        response.redirect('/');
});

router.route('/assertion-consumer-service').post(
    bodyParser.urlencoded({ extended: false }),
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    (_: Request, response: Response) => {
        response.redirect('/auth/greeting');
});

router.route('/greeting').get(IsAuthenticatedSession, AuthController.greetingUser);

export default router;
