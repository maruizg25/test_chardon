import express from 'express';
const cors = require("cors");
import config from './config';
import clientesRoutes from './routes/clientes.routes';

const app = express();

//midelewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.set('port', config.port);

app.use(clientesRoutes)
export default app;