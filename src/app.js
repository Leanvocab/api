import express from 'express';
import path from 'path';

import passport from 'passport';
import PassportLocal from 'passport-local';

import word from './word';
import user from './user';

const LocalStrategy = PassportLocal.Strategy;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.model.authenticate()));
passport.serializeUser(user.model.serializeUser());
passport.deserializeUser(user.model.deserializeUser());

app.use('/word', word.router);
app.use('/user', user.router);

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user/me');
    }
    res.render('login')
});

app.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user/me');
    }
    res.render('register')
});

app.get('/', (req, res) => res.render('index', {username: req.user.username}));

export default app;
