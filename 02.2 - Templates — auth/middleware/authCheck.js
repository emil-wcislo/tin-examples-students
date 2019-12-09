module.exports = (req, res, next) => {
  const isUserLoggedIn = req.session.isUserLoggedIn;
  if(isUserLoggedIn) {
    next();
  } else {
    req.flash('authError', 'Nie masz uprawnień do tego działania');
    res.redirect('/');
  }
}