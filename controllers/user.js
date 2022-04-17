const registerUser = (req, res) => {
  res.json({ message: "Register User" });
};

const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

//will send the token and with that token get the id and find the user
const getMe = (req, res) => {
  res.json({ message: "Get users" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
