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
  .get((req, res) => {
    let response = {};
    let res_status = 200;

    User.find((err, doc) => {
      if (err) {
        response = { error: true, message: "Error fetching data!" };
        res_status = 500;
      } else if (isEmpty(doc)) {
        response = { error: true, message: "Users not found!" };
        res_status = 404;
      } else {
        setFullName(doc);
        response = { error: false, message: doc };
      }

      res.status(res_status).json(response);
    });
  })
  .post(async (req, res) => {
    // console.log("req.body.username : " + req.body.username);
    // console.log("req.body.last : " + req.body.name.last);

    let response = {};

    try {
      let user = new User(req.body);
      let result = await user.save();

      response = { error: false, message: `User added! ${result}` };
      res.status(200).json(response);
    } catch (error) {
      response = { error: true, message: error };
      res.status(500).json(response);
    }
  });

router
  .route("/user/:name")
  .get((req, res) => {
    let response = {};
    let res_status = 200;

    let query = { username: req.params.name };

    User.find(query, (err, doc) => {
      if (err) {
        response = { error: true, message: "Error fetching data!" };
        res_status = 500;
      } else if (isEmpty(doc)) {
        response = { error: true, message: "User not found!" };
        res_status = 404;
      } else {
        setFullName(doc);
        response = { error: false, message: doc };
      }

      res.status(res_status).json(response);
    });
  })
  .put(async (req, res) => {
    let response = {};

    try {
      let updateUser = new User(req.body);

      // {query, update, options}
      await User.updateOne({ username: req.params.name }, updateUser, {
        upsert: true,
      });

      response = {
        error: false,
        message: `User update was successful! ${updateUser}`,
      };
      res.status(200).json(response);
    } catch (error) {
      response = { error: true, message: error };
      res.status(500).json(response);
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
