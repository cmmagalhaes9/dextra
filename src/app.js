const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const MongoStore = require('connect-mongo');
const { SECRET, MONGODB_URI } = require('./config');

const app = express();
require('./strategies/discordStrategy');

//settings
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24, // 1 day
      // secure: true
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord-oauth2',
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

//routes
app.use('/', require('./routes/auth.routes'));
app.use('/success', require('./routes/dashboard.routes'));

app.get('*', (req, res) => {
  if (req.originalUrl === '/success') {
    return res.render('dashboard'); // Render the dashboard if the route is /dashboard
  }
  res.redirect('/');
});

module.exports = app;
