import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import path from 'path'

import connectDB from './config/db';


const app = express();

//Connect database
connectDB();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/user', usersRouter);


export default app;