const express = require("express");
const dotenv = require("dotenv").config();
const goalRouter = require("./routes/goal");
const app = express();

app.use(express.json());
app.use("/api/goals", goalRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
