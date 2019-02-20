const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const uuid = require('uuid/v4');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const newRouter  = require('./routes/new');
const settingsRouter = require('./routes/settings');
const postRouter = require('./routes/post');
const logoutRouter = require('./routes/logout');

const app = express();


app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views')]);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    name:"_session",
    genid:(req) => {
        return uuid();
    },
    secret:"itgscanbefun!",
    store: new FileStore(),
    saveUninitialized:false,
    resave:false,
    cookie: {maxAge:1000*900}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/new', newRouter);
app.use('/settings',settingsRouter);
app.use(postRouter);
app.use('/logout', logoutRouter);

module.exports = app;
