function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
  }

  function get(req, res) {
    const { query } = req;

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  }

  return { get, post };
}

module.exports = booksController;
