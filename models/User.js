import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  gender: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  username: { type: String },
  name: {
    title: { type: String },
    first: { type: String },
    last: { type: String },
  },
  fullName: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;

/*
  mongoimport --db people --collection users --jsonArray users.js
*/
