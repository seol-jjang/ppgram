const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 6
    },
    nickname: {
      type: String,
      maxlength: 20,
      trim: true,
      unique: true
    },
    role: {
      type: Number,
      default: 1
    },
    profileImage: {
      type: String,
      default:
        "https://pineapplegram-image.s3.ap-northeast-2.amazonaws.com/uploads_profileImage/defaultProfile.jpg"
    },
    token: {
      type: String
    },
    tokenExp: {
      type: Number
    },
    sns_type: {
      type: String
    },
    sns_id: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.statics.findByToken = function (token, callback) {
  const user = this;

  //토큰을 decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾고
    //클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.checkEmail = function (email, callback) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.methods.checkNickname = function (nickname, callback) {
  User.findOne({ nickname: nickname }, function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;

  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.methods.updatePassword = function (plainPassword, callback) {
  const user = this;
  user.password = plainPassword;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
