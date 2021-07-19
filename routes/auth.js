const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validateLogin, validateRegister } = require("../utils/validation");

//Register
router.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const { errors, valid } = validateRegister(username, email, password);
    if (!valid) {
      res.status(400).json(errors);
    }
    password = await bcrypt.hash(password, 10);

    const newUser = await User({
      username,
      email,
      password,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { errors, valid } = validateLogin(email, password);
    if (!valid) {
      res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).send("Wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
