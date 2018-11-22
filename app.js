const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require("http-errors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views')]);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
    let path;
});

module.exports = app;