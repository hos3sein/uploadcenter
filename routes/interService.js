const express = require("express");

const C = require("../controllers/interService");


const { protect} = require("../middleware/auth");

const router = express.Router();

// POST

// GET

router.post("/removefile",C.removeFile)









module.exports = router;
