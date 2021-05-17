const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("../controllers/User");

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:name")
  .get(getUserByUsername)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
