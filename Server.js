let express = require("express");
let app = express();

let bodyParser = require("body-parser");
let router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.json({ error: false, message: "Hello World!" });
});

app.use(router);

app.listen(3000);
console.log("Listening to port 3000");
