const express = require("express");

const C = require("../controllers/upload");


const { protect} = require("../middleware/auth");

const router = express.Router();

// POST
router.post("/single",C.uploadsingel);

router.post("/singlecontent", protect ,C.uploadSingelForContent);

router.post("/profileimage",C.uploadProfileImage)

// GET








module.exports = router;
