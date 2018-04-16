const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/voting');
const pollRoutes = require('./routes/poll');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static files
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, '/views')));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route root
app.get('/', (req, res) => {
  // res.sendFile("index.html")
  res.render('index', { pageTitle: 'Welcome to the Amazing Poll Machine' });
});

// API routes
app.use('/api', apiRoutes);
app.use('/poll', pollRoutes);

// add new polls
app.use('/new', (req, res) => {
  // res.sendFile("views/new.html", { root: __dirname});
  res.render('new', { pageTitle: 'Add a New Poll!' });
});

app.listen(port, () => {
  console.log(`Now running on ${port}`);
});
