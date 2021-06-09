require('dotenv').config()
const express = require('express');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/failed', (req, res) => res.send('Failed to login!'));
app.get('/good', (req, res) => res.send(`Welcome !${req.user.email}`));

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

app.listen(PORT, () => {
  console.log(`Posts service listening on ${PORT}`)
});