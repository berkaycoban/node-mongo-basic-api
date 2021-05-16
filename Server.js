const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const router = express.Router();

const User = require("./models/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.json({ error: false, message: "Hello World!" });
});

const setFullName = require("./helpers/setFullName");
const isEmpty = require("./helpers/isEmpty");

router
  .route("/users")
  .get(async (req, res) => {
    try {
      const doc = await User.find();

      if (isEmpty(doc)) {
        res.status(404).json({ error: true, message: "Users not found!" });
      } else {
        setFullName(doc);
        res.status(200).json({ error: false, message: doc });
      }
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  })
  .post(async (req, res) => {
    // console.log("req.body.username : " + req.body.username);
    // console.log("req.body.last : " + req.body.name.last);

    try {
      let user = new User(req.body);
      let result = await user.save();

      res.status(200).json({ error: false, message: `User added! ${result}` });
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  });

router
  .route("/user/:name")
  .get(async (req, res) => {
    try {
      let query = { username: req.params.name };
      const doc = await User.find(query);

      if (isEmpty(doc)) {
        res.status(404).json({ error: true, message: "User not found!" });
      } else {
        setFullName(doc);
        res.status(200).json({ error: false, message: doc });
      }
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  })
  .put(async (req, res) => {
    try {
      let query = { username: req.params.name };
      let update = new User(req.body);
      let options = { upsert: true };

      await User.updateOne(query, update, options);

      res.status(200).json({
        error: false,
        message: `User update was successful! ${updateUser}`,
      });
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  })
  .delete(async (req, res) => {
    try {
      let doc = await User.findOneAndRemove({ username: req.params.name });

      if (doc) {
        return res
          .status(200)
          .json({ error: false, message: "User delete was successful!" });
      } else {
        return res
          .status(404)
          .json({ error: true, message: "User not found!" });
      }
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  });

app.use(router);

app.listen(3000);
console.log("Listening to port 3000");
