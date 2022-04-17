const Joi = require("joi");

const getGoals = (req, res) => {
  res.status(200).json({ message: "Get goals" });
};

const saveGoal = (req, res) => {
  const { error } = validateGoal(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  res.status(201).json({ message: "Save goal" });
};

const updateGoal = (req, res) => {
  res.status(200).json({ message: "Update Goal" });
};

const deleteGoal = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Deleted goal with id ${id}` });
};

const validateGoal = (goal) => {
  const schema = Joi.object({});
  return schema.validate(goal);
};

module.exports = {
  getGoals,
  saveGoal,
  updateGoal,
  deleteGoal,
};
