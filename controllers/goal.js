const Joi = require("joi");
const asyncHandler = require("express-async-handler");

const Goal = require("../model/goal");
const User = require("../model/user");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const saveGoal = asyncHandler(async (req, res) => {
  //   const { error } = validateGoal(req.body);
  //   if (error) return res.status(400).json({ message: error.details[0].message });

  if (!req.body.text) {
    res.status(404);
    throw new Error("Please add a text");
  }

  let goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the loggedin user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the loggedin user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedGoal = await goal.remove();
  res
    .status(200)
    .json({ message: `Deleted goal with id ${id}`, goal: deletedGoal });
});

const validateGoal = (goal) => {
  const schema = Joi.object({
    text: Joi.string().required("Please add a text field"),
  });
  return schema.validate(goal);
};

module.exports = {
  getGoals,
  saveGoal,
  updateGoal,
  deleteGoal,
};
