const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

const port = process.env.PORT || 3000;
const app = express();
const bookRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/bookAPI');

bookRouter
  .route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
  })
  .get((req, res) => {
    const { query } = req;

    Book.find(query, (err, books) => {
      if (err) {
        res.send(err);
      }

      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      res.send(err);
    }

    return res.json(book);
  });
});

app.use('/api', bookRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
