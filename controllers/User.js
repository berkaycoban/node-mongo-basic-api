const User = require("../models/User");

const setFullName = require("../helpers/setFullName");
const isEmpty = require("../helpers/isEmpty");

// @desc    Get all users
// @route   GET /users
// @access  Public
const getAllUsers = async (req, res, next) => {
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
    next();
  }
};

// @desc    Create new user
// @route   POST /users
// @access  Public
const createUser = async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();

    res.status(200).json({ error: false, message: `User added! ${result}` });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

// @desc    Get user info with matched users
// @route   GET /users/:name
// @access  Public
const getUserByUsername = async (req, res) => {
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
};

// @desc    Update user with matched username
// @route   PUT /users/:name
// @access  Public
const updateUser = async (req, res) => {
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
};

// @desc    Delete user with matched username
// @route   DELETE /users/:name
// @access  Public
const deleteUser = async (req, res) => {
  try {
    let doc = await User.findOneAndRemove({ username: req.params.name });

    if (doc) {
      return res
        .status(200)
        .json({ error: false, message: "User delete was successful!" });
    } else {
      return res.status(404).json({ error: true, message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
