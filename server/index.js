const express = require("express");
const badWords = require("./badWords.json");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
require("dotenv").config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Profinity filter");
});

app.get("/bad-word", (req, res) => {
  const { message } = req.body;
  const msg = message.split(" ");

  let flag = false;

  msg.map((m) => {
    if (badWords.badWords.includes(m)) {
      flag = true;
      return;
    }
  });
  if (flag) res.send("Gaali mat de bho***ke");
  else res.send("Tu toh dev manush nikla re baba!!");
});

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
