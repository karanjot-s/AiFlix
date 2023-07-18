const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    filename: { type: String, required: true },
    rankingScore: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
