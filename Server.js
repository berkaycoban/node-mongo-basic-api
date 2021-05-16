const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const router = express.Router();

const mongoOp = require("./models/mongo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.json({ error: false, message: "Hello World!" });
});

app.use(router);

app.listen(3000);
console.log("Listening to port 3000");
