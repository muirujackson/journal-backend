import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
//import entryRoutes from './routes/entryRoutes';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/api/auth', authRoutes);
//app.use('/api/entries', entryRoutes);

export default app;