const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const router = express.Router();

const connectDB = require("./config/db");
connectDB();

const {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("./controllers/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.json({ error: false, message: "Hello World!" });
});

router.route("/users").get(getAllUsers).post(createUser);
router
  .route("/users/:name")
  .get(getUserByUsername)
  .put(updateUser)
  .delete(deleteUser);

app.use(router);

app.listen(3000);
console.log("Listening to port 3000");
