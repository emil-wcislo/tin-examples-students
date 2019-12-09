const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get('/showLogin', (req, res, next) => {
  res.render('auth/loginForm', {pageTitle: 'Logowanie'});
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = User.findByEmail(email);
  if(user) {
    user.comparePassword(password)
      .then(result => {
        if(result) {
          req.session.isUserLoggedIn = true;
          req.session.loggedUser = user;
          res.redirect('/');
        } else {
          invalidEmailOrPassword(req, res);
        }
      })
  } else {
    invalidEmailOrPassword(req, res);
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

function invalidEmailOrPassword(req, res) {
  req.flash('loginError', 'Nieprawidłowy email lub hasło');
  res.redirect('/auth/showLogin');
}

module.exports.route = router;