const User = require("../models/user/users");
const passport = require("passport");

module.exports = {
  register: (req, res, next) => {
    const user = req.body;
    // validation checks
    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: "is required",
        },
      });
    }

    const finalUser = new User(user);
    // Encrypts password
    console.log("create user: ", finalUser.username);
    finalUser.pens.push({});
    finalUser
      .save()
      //  Successful creation
      .then(() => res.json(finalUser.toAuthJSON()));
  },
  login: (req, res, next) => {
    const user = req.body;

    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: "is required",
        },
      });
    }
    // IF Validation checks out execute login in
    passport.authenticate(
      "local",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err);
        }
        if (passportUser) {
          req.login(passportUser, function (err) {
            if (err) {
              next(err);
            }
            const user = passportUser;
            console.log(`user ${passportUser.username} has logged in`);
            return res.json(passportUser.toAuthJSON());
          });
        }
        return res.status(400).json();
      }
    )(req, res, next);
  },
  me: (req, res, next) => {
    const me = req.body;
    res.json({ success: "its working" });
  },
  logout: (req, res, next) => {},
  append: (req, res, next) => {},
};
