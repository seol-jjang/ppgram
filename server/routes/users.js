const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { User } = require("../models/User");

router.get("/auth", auth, (req, res) => {
  //middleware 통과
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? true : false,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    nickname: req.user.nickname,
    role: req.user.role,
    profileImage: req.user.profileImage,
    sns_type: req.user.sns_type
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.checkEmail(req.body.email, function (err, result) {
    if (result !== null) {
      // throw new Error("Email Invalid");
      return res.status(409).json({ message: "이미 가입 된 이메일입니다." });
      // return res.json({
      //   success: false,
      //   message: "이미 가입 된 이메일입니다."
      // });
    }
    user.checkNickname(req.body.nickname, function (err, result) {
      if (result !== null) {
        return res
          .status(409)
          .json({ message: "이미 존재하는 사용자 이름입니다." });
        // return res.json({
        //   success: false,
        //   message: "이미 존재하는 사용자 이름입니다."
        // });
      }
      user.save((err, userInfo) => {
        if (err) {
          return res.status(400).send(err);
          // return res.json({ success: false, err });
        }
        return res.status(200).json({ success: true });
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email, sns_type: null }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        message:
          "입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요."
      });
      // return res.json({
      //   loginSuccess: false,
      //   message:
      //     "입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요."
      // });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      //확인했다면 비밀번호가 일치하는 지 확인
      if (!isMatch) {
        return res.status(404).json({
          message: "입력된 정보가 잘못되었습니다. 다시 확인해주세요."
        });
        // return res.json({
        //   loginSuccess: false,
        //   message: "입력된 정보가 잘못되었습니다. 다시 확인해주세요."
        // });
      }
      //일치한다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token).status(200).json({
          userId: user._id,
          nickname: user.nickname
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send({
      logoutSuccess: true
    });
  });
});

module.exports = router;
