const User = require("../models/User");
const Video = require("../models/Video");
const { uploadFile } = require("./fileHandler");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ rankingScore: "desc" });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postVideo = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.file);

    const { originalname, buffer, mimetype } = req.file;

    const cloudRes = await uploadFile(
      buffer,
      originalname,
      mimetype,
      title,
      req.userId
    );

    // return res.json(cloudRes);

    const video = new Video({
      title,
      filename: cloudRes.secure_url,
      user: req.userId,
      cloudRes,
    });
    await video.save();

    res.json(video);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const upvote = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already upvoted the video
    if (user.upvotes.includes(video._id)) {
      // If the user has already upvoted, remove the upvote
      user.upvotes.pull(video._id);
      video.upvotes--;
      video.rankingScore--;
    } else {
      // Check if the user has previously downvoted the video
      if (user.downvotes.includes(video._id)) {
        // If the user has downvoted before, remove the downvote
        user.downvotes.pull(video._id);
        video.downvotes--;
      }

      // Upvote the video and add it to the user's upvotedVideos array
      user.upvotes.push(video._id);
      video.upvotes++;
    }

    video.rankingScore = video.upvotes - video.downvotes;

    await Promise.all([user.save(), video.save()]);

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const downvote = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already downvoted the video
    if (user.downvotes.includes(video._id)) {
      // If the user has already downvoted, remove the downvote
      user.downvotes.pull(video._id);
      video.downvotes--;
    } else {
      // Check if the user has previously upvoted the video
      if (user.upvotes.includes(video._id)) {
        // If the user has upvoted before, remove the upvote
        user.upvotes.pull(video._id);
        video.upvotes--;
      }

      // Downvote the video and add it to the user's downvotedVideos array
      user.downvotes.push(video._id);
      video.downvotes++;
    }

    video.rankingScore = video.upvotes - video.downvotes;
    await Promise.all([user.save(), video.save()]);

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllVideos, postVideo, upvote, downvote };
