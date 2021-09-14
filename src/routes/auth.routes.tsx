import express, {
    Router,
    Request,
    Response
} from 'express';
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

router.route('/greeting').get((request: Request, response: Response) => {
    console.log(request);
    response.status(200).json({
        hello: 'world',
    });
});

export default router;
