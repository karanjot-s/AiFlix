const express = require("express");
const { checkUnique, login, register, getUser } = require("./controller");
const { verifyToken } = require("./token");
const router = express.Router();

router.get("/get", verifyToken, getUser);
router.post("/login", login);
router.get("/register", checkUnique);
router.post("/register", register);

module.exports = router;
