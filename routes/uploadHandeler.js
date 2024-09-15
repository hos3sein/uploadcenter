const express = require("express");

const C = require("../controllers/uploadHandeler");

const { protect } = require("../middleware/auth");

const router = express.Router();

// POST

// ! ok
router.post("/single", C.uploadHandelerSingle);

router.post("/multiple", C.uploadHandelerMultiply);

router.post("/removefile",C.removeFile)



module.exports = router;
