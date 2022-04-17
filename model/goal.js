const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      maxlength: 500,
      required: [true, "Please add a text value"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //name of the model, user associated with the goal
      required: true,
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
