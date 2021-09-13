import express, {
    Router,
    Request,
    Response
} from 'express';

const router: Router = express.Router();

router.route('/entrypoint').get(
    (resquest: Request, response: Response) => {

});

router.route('/assertion-conumser-service').post(
    (reuqest: Request, response: Response) => {

});

export default router;
