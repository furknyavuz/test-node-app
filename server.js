const express = require('express');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('home'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

passport.use(new GitHubStrategy({
        clientID: '50ffe15b2d80064892ce',
        clientSecret: 'd8f30682e806cf5bd72423da2b184f93ee5384f0',
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('Gathered access token: ' + accessToken);
        return done(null, profile);
    }
));

app.get('/login',
    function (req, res) {
        res.render('login');
    }
);

app.get('/auth/github',
    passport.authenticate('github', {scope: ['user:email']})
);

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login', session: false }),
    function (req, res) {
        console.log('Gathered user: ' + req.user.username);
        res.render('profile', {user: req.user});
    }
);
