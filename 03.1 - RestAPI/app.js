const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parsuje dane typu application/json
app.use(bodyParser.json())

app.use(cors());
const userService = require('./api/userService');
app.use('/api/users', userService.route);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
