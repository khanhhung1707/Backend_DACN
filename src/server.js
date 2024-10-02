import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import courseRouter from './routes/courseRoutes.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use(authRouter)
app.use(courseRouter)

app.listen(8080)