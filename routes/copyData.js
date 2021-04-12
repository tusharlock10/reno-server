const express = require("express");
const router = express.Router({ mergeParams: true });
const { copyData } = require("../controllers/copyData");

// @Route    POST '/api/v1/copyData'
// @desc     VCopies data from db/data to prisma server
// @access   Public
router.post("/copyData", copyData);

module.exports = router;
