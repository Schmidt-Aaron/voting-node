const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./routes/voting');

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//route root
app.get('/', (req, res) => {
  res.send("heelo root!")
})

//API routes
app.use('/api', routes);

const listener = app.listen(port, () => {
  console.log(`Now running on ${port}`);
})
