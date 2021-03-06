const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// User model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// on save hook, encrypt pw
// salt + plain pw = (salt + hashed pw)
// comparing pw when sign in: salt + submitted pw = hashed pw
// before saving model, run this fn
userSchema.pre("save", function(next) {
  // get access to user model
  const user = this;
  // generate a salt then run cb
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    // hash pw using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      // overwrite pw w/ hashed pw
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Model class
const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;
