const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/voting');
const pollRoutes = require('./routes/poll')

//static files
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug')

//route root
app.get('/', (req, res) => {
  //res.sendFile("index.html")
  res.render('index', { pageTitle: "Welcome to the Amazing Poll Machine"})
})

//API routes
app.use('/api', apiRoutes);
app.use('/poll', pollRoutes);

//add new polls 
app.use('/new', (req, res) => {
  // res.sendFile("views/new.html", { root: __dirname});
  res.render('new', { pageTitle: 'Add a New Poll!'});
})

const listener = app.listen(port, () => {
  console.log(`Now running on ${port}`);
})
