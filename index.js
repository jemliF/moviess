require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const boom = require('express-boom');
const cors = require('cors');

/**
 * Our Controllers
 */
const movies = require('./app/controllers/movies');
const actors = require('./app/controllers/actors');

/**
 * Providers
 */
const mongo = require('./providers/mongo');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(boom());
app.use(morgan('dev'));

app.use('/api/v1/', movies);
app.use('/api/v1/', actors);

mongo.check();
app.use('/', express.static('public'));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
      console.log('Movies is up!');
  }
});
