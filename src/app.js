import express from "express"
import cors from "cors";
import blogRouter from './routes/blog.js';
import userRouter from './routes/user.js';
import loginRouter from './routes/login.js';
import authorRouter from './routes/author.js';
import readingRouter from './routes/readinglist.js';
import logoutRouter from './routes/logout.js'
import { unknownEndpoint, errorHandler } from "./util/middleware.js";
import { connectToDatabase } from "./util/bd.js";
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/author', authorRouter);
app.use('/api/readinglists', readingRouter);
app.use('/api/logout', logoutRouter);

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
    await connectToDatabase();
}

start();

export default app;