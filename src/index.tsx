import express, { 
    Application, 
    Request, 
    Response 
} from 'express';

import AuthRouter from './routes/auth.routes';
const app: Application = express();
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

