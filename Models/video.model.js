import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videos: {
    type: [String],
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
