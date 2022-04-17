const express = require("express");
const router = express.Router();

const {
  getGoals,
  saveGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goal");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, saveGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
