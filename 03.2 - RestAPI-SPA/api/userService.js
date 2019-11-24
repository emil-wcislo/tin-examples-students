const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', (req, res, next) => {
    const users = User.list();
    res.json(users);
});
router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    const user = User.details(userId);
    res.json(user);
});
router.post('/', (req, res, next) => {
    const newUser = req.body;
    console.log(`router post /users data: ${JSON.stringify(newUser)}`);
    const createdUser = User.add(newUser);
    res.status(201).json(createdUser);
});
router.put('/:userId', (req, res, next) => {
    const userData = req.body;
    const userId = req.params.userId;
    userData.id = userId;
    User.edit(userData);
    res.status(204).end();
});
router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    console.log(`delete userId: ${userId}`);
    User.delete(userId);
    res.status(204).end();
});

module.exports.route = router;