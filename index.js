const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const goalRouter = require("./routes/goal");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for url encoded
app.use("/api/goals", goalRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
