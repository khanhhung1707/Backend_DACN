import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import nhanXetRouter from './routes/nhanXetRoutes.js';
import regisCoursetRouter from './routes/registerCourseRoutes.js';
import ordertRouter from './routes/orderRoutes.js';
import likeCourseRouter from './routes/likeCourseController.js';
import followAuthorRouter from './routes/followAuthorRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API Information",
            contact: {
                name: "Developer",
            },
            servers: ["http://localhost:8080"],
        },
    },
    apis: ["src/swagger/index.js"], 
};
const specs = swaggerJsDoc(options);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/swagger", swaggerUi.serve, (req, res, next) => {
    next();
}, swaggerUi.setup(specs));


app.use(cors())
app.use(express.json());

app.use(authRouter)
app.use(courseRouter)
app.use(commentRouter)
app.use(nhanXetRouter)
app.use(regisCoursetRouter)
app.use(ordertRouter)
app.use(likeCourseRouter)
app.use(userRouter)
app.use(followAuthorRouter)

app.listen(8080)