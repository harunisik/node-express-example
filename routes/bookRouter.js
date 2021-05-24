/* eslint-disable no-underscore-dangle */
const express = require('express');
const Book = require('../models/bookModel');
const booksController = require('../controllers/booksController');

function routes() {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books').post(controller.post).get(controller.get);

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }

      if (!book) {
        return res.sendStatus(404);
      }

      req.book = book;
      return next();
    });
  });

  bookRouter
    .route('/books/:bookId')
    .get((req, res) => {
      const { book } = req;
      res.json(book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];

        book[key] = value;
      });

      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      const { book } = req;
      book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
}

module.exports = routes;
