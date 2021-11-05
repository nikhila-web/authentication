const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true,
      },
      password: String,
      onboarded: { type: Boolean, default: false },
      first_name: String,
      last_name: String,
});
module.exports = User = mongoose.model('user', UserSchema)
