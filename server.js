const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const express = require('express');

passport.use(new GitHubStrategy({
        clientID: '50ffe15b2d80064892ce',
        clientSecret: 'd8f30682e806cf5bd72423da2b184f93ee5384f0',
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },

    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        return done(null, profile);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
    function (req, res) {
        res.render('home', {user: req.user});
    }
);

app.get('/login',
    function (req, res) {
        res.render('login');
    }
);

app.get('/auth/github',
    passport.authenticate('github', {scope: ['user:email']})
);

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/profile');
    }
);

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', {user: req.user});
    }
);

app.listen(3000);
