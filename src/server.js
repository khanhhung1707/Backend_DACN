import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import nhanXetRouter from './routes/nhanXetRoutes.js';
import regisCoursetRouter from './routes/registerCourseRoutes.js';
import ordertRouter from './routes/orderRoutes.js';
import likeCourseRouter from './routes/likeCourseController.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use(authRouter)
app.use(courseRouter)
app.use(commentRouter)
app.use(nhanXetRouter)
app.use(regisCoursetRouter)
app.use(ordertRouter)
app.use(likeCourseRouter)

app.listen(8080)