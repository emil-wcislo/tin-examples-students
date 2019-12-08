const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parsuje dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

const userController = require('./controller/userController');
app.use('/users', userController.route);

//test połączenia do bazy danych
const db = require('./db/mysql');
db.execute('select * from users')
  .then(([data, metadata]) => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
