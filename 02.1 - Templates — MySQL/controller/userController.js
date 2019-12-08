const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    User.list()
      .then( ([userList, metadata]) => {
        //wywołane w momencie poprawnego wykonania instrukcji sql i zwrócenia wyniku
        res.render('users/userList', {userList: userList});
      })
      .catch(err => {
        //błąd komunikacji z bazą danych
        console.log(err);
      });
    
});

router.get("/showNewForm", (req, res, next) => {
    res.render('users/userForm', { pageTitle: "Nowy użytkownik", formAction: "add", user: {} });
});

router.get("/showEditForm", (req, res, next) => {
    //FIXME
});

router.post("/add", (req, res, next) => {
    const newUser = new User(req.body.first_name, req.body.last_name);
    User.add(newUser)
      .then(() => {
        res.redirect("/users");
      })
      .catch(err => {
        console.log(err);
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