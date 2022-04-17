const express = require("express");
const router = express.Router();

const {
  getGoals,
  saveGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goal");

router.get("/", getGoals);

router.post("/", saveGoal);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

module.exports = router;
