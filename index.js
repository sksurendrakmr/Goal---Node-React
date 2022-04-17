const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const goalRouter = require("./routes/goal");
const userRouter = require("./routes/user");
const { errorHandler } = require("./middleware/errorMiddleware");
const db = require("./config/db");

db();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for url encoded

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
