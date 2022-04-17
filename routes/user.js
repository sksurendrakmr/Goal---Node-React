/**
 * 1. register a user
 * 2. login
 * 3. get the user information
 */

const express = require("express");
const router = express.Router();
const { registerUser, getMe, loginUser } = require("../controllers/user");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

module.export = router;
