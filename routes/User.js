import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
} from '../controllers/User.js';

router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:name')
  .get(getUserByUsername)
  .put(updateUser)
  .delete(deleteUser);

export default router;
