const express = require("express");
const badWords = require("./badWords.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
require("dotenv").config();
const port = process.env.PORT || 3001;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Profinity filter");
});

app.get("/bad-word", (req, res) => {
  const { message } = req.query;
  const msg = message.split(" ");
  try {
    let flag = false;

    msg.map((m) => {
      if (badWords.badWords.includes(m)) {
        flag = true;
        return;
      }
    });
    if (flag) res.send(true);
    else res.send(false);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
