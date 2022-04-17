const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const Joi = require("joi");

const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    // throw new Error(error.details[0].message);
  }
  const { name, email, password } = req.body;
  //check if user is already exists
  const isUserExist = await User.findOne({ email });
  console.log(isUserExist);
  if (isUserExist) {
    res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  //if user is created
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register User" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter email and password");
  }

  const user = await User.findOne({ email });
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (user && isPasswordMatched) {
    console.log(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credential");
  }

  res.json({ message: "Login User" });
});

//will send the token and with that token get the id and find the user
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required("Please add name"),
    email: Joi.string().email().required("Enter valid email"),
    password: Joi.string().required("Enter password"),
  });

  return schema.validate(user);
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
