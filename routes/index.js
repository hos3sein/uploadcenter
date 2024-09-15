const express = require("express");
const router = express.Router();

//prefix router Approve
const uploadHndeler = require("./uploadHandeler");
router.use("/", uploadHndeler);

//prefix router Dev


module.exports = router;
