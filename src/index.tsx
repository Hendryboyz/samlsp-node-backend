import express, { 
    Application, 
} from 'express';
import { loadApplication } from './loader';


const app: Application = express();
loadApplication({ app });

const port = 4001;

try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch(error: any) {
    console.error(`Error occured: ${error.message}`);
}