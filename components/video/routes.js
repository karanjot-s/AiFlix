const express = require("express");
const router = express.Router();

const { upload } = require("./fileHandler");
const { getAllVideos, postVideo, upvote, downvote } = require("./controller");
const { verifyToken } = require("../auth/token");

router.get("/", getAllVideos);
router.post("/", verifyToken, upload.single("video"), postVideo);
router.put("/:id/upvote", verifyToken, upvote);
router.put("/:id/downvote", verifyToken, downvote);

module.exports = router;
