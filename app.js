var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my API.");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
