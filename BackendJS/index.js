import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { payment } from './controllers/payment.controller.js';
import { sendMail } from './controllers/mailer.controller.js';
import { stadistics1 } from './controllers/data.controller.js';
import { stadistics2 } from './controllers/data.controller.js';
import { stadistics3 } from './controllers/data.controller.js';
import { saveCode } from './controllers/data.controller.js';
import { getCode } from './controllers/data.controller.js';
import { PORT } from './config.js';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.use('/payment', payment);
app.use('/mailer/', sendMail);
app.use('/stadistics1', stadistics1);
app.use('/stadistics2', stadistics2);
app.use('/stadistics3', stadistics3);
app.use('/saveCode', saveCode);
app.use('/getCode', getCode);

app.listen(PORT);
console.log('Server on port', PORT);
