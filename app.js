const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const env = require('dotenv');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// requiring all routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const quizRouter = require('./routes/quiz');

const app = express();
env.config();

// connecting to mongodb
mongoose.connect('mongodb://localhost/quizarama')
    .then(() => {console.log('Connected to the db')},
        err => {console.log(err)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'disco dancer', resave: true, saveUninitialized: true, cookie: {secure: true, maxAge: 2*60*60}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.danger = req.flash('danger');
    res.locals.info = req.flash('info');
    res.locals.warning = req.flash('warning');
    next();
});

// routes setup
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/quiz', quizRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     next(createError(404));
// });

// error handler
// app.use((err, req, res) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
