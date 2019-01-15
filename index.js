const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./config/db');
const { routes } = require('./config/routes');

const port = 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(useragent.express());

// logger should be at the top before redirecting to routes.js
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setting up the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(function (req, res, next) {
  console.log('hi');
  next();
})

app.use('/', routes);

// error handler should be at the bottom of the code
app.use(function(req, res, next) {
  res.status(404).send('The resource you are looking for does not exist');
  next();
});

app.listen(port, () => {
    console.log('listening on port', port);
});
