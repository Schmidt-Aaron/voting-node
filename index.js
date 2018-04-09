const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./routes/voting');

//static files
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//route root
app.get('/', (req, res) => {
  res.sendFile("index.html")
})

//API routes
app.use('/api', routes);

const listener = app.listen(port, () => {
  console.log(`Now running on ${port}`);
})
