import Video from "../Models/video.model.js";
import cloudinary from "../config/cloudinary.js";

export const uploadVideo = async (req, res) => {
  try {
    const { video } = req.body;

    if (!video) {
      return res.status(400).json({ message: "Video tapılmadı" });
    }

    // Cloudinary-ə yüklə
    const result = await cloudinary.uploader.upload(video, {
      resource_type: "video",
      folder: "",
    });

    const newVideo = new Video({
      videos: [result.secure_url],
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uğurla yükləndi ✅",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();

    res.status(200).json({
      message: "Videolar uğurla alındı ✅",
      count: videos.length,
      videos,
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const videoDoc = await Video.findById(id);
    if (!videoDoc) {
      return res.status(404).json({ message: "Video tapılmadı" });
    }

    for (const url of videoDoc.videos) {
      const public_id = url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
    }

    await videoDoc.remove();

    res.status(200).json({
      message: "Video uğurla silindi ✅",
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};
