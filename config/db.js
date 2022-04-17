const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(`${process.env.MONGO_DB_URL}/goals`)
    .then((conn) =>
      console.log(`connected..${conn.connection.host}`.cyan.underline)
    )
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
};
