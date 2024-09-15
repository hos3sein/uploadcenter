const express = require("express");
const router = express.Router();

//prefix router User
const upload = require("./upload");
router.use("/", upload);

const interService=require("./interService")

router.use("/interservice", interService);


//prefix router Dev

module.exports = router;
