const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parsuje dane typu application/json
app.use(bodyParser.json())
app.use(express.static('public'));

const isAuth = require('./middleware/isAuth');

const userService = require('./api/userService');
app.use('/api/users', isAuth, userService);

const authService = require('./api/authService');
app.use('/api/auth', authService);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
