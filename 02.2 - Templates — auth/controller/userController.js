const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    const userList = User.list();
    res.render('users/userList', { pageTitle: "Lista użytkowników", userList: userList});
});

router.get("/showNewForm", (req, res, next) => {
    res.render('users/userForm', { pageTitle: "Nowy użytkownik", formAction: "add", user: {} });
});

router.get("/showEditForm", (req, res, next) => {
    //FIXME
});

router.post("/add", (req, res, next) => {
  User.hashPassword(req.body.password)
    .then(hash => {
      const newUser = new User(req.body.first_name, req.body.last_name, req.body.email, hash);
      User.add(newUser);
      res.redirect("/users");
    }); 
    
});

router.post("/edit", (req, res, next) => {
    //FIXME
});

router.get("/showDetails", (req, res, next) => {
    //FIXME
});

router.get("/delete", (req, res, next) => {
    //FIXME
});


module.exports.route = router; 