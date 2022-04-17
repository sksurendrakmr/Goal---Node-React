const express = require("express");
const router = express.Router();

const {
  getGoals,
  saveGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goal");

router.route("/").get(getGoals).post(saveGoal);

router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
