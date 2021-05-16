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

router
  .route("/users")
  .get((req, res) => {
    let response = {};
    mongoOp.find({}, (err, data) => {
      if (err) {
        response = { error: true, message: "Error fetching data!" };
      } else {
        response = { error: false, message: data };
      }
      res.json(response);
    });
  })
  .post(async (req, res) => {
    // console.log("req.body.username : " + req.body.username);
    // console.log("req.body.last : " + req.body.name.last);

    let response = {};

    try {
      let user = new mongoOp(req.body);
      let result = await user.save();

      response = { error: false, message: `User added! ${result}` };
      res.status(200).json(response);
    } catch (error) {
      response = { error: true, message: error };
      res.status(500).json(response);
    }
  });

app.use(router);

app.listen(3000);
console.log("Listening to port 3000");
