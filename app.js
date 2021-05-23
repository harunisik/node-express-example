const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRouter');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/bookAPI');

app.use('/api', bookRouter());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
