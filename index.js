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

app.post("/bad-word", (req, res) => {
  const { message } = req.params;
  const msg = message.split(" ");
  try {
    let flag = false;

    msg.forEach((m) => {
      if (badWords.badWords.includes(m)) {
        flag = true;
        return;
      }
    });

    res.send(flag);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
