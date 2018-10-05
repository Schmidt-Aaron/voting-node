const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static files
app.use(express.static(path.join(__dirname, '/public')));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up our routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Now running on ${port}`);
});
