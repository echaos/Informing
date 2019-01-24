const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const createError = require("http-errors");

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const newRouter  = require('./routes/new');
const settingsRouter = require('./routes/settings');
const postRouter = require('./routes/post');


const app = express();


app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views')]);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/new', newRouter);
app.use('/settings',settingsRouter);
app.use(postRouter);

module.exports = app;
