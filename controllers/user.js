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
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register User" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

//will send the token and with that token get the id and find the user
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "Get users" });
});

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
