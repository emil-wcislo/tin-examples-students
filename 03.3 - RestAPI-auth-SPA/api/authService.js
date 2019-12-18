const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(`authService, email: ${email} password: ${password}`);
  const user = User.findByEmail(email)
  console.log(`authService, foundUser: ${JSON.stringify(user)}`);
  if (!user) {
    res.status(401).end('Wrong email or password!');
    return;
  }
  bcrypt.compare(password, user.passwordHash)
  .then(isEqual => {
    if (!isEqual) {
      res.status(401).end('Wrong email or password!');
      return;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      'a_very_very_secret_passsword',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: user.id});
  })
  .catch(err => {
    console.log(err);
    res.status(501);
  });
});
  

module.exports = router;