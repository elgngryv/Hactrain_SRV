import Image from "../Models/image.model.js";
import cloudinary from "../config/cloudinary.js";

// 🔹 Şəkil yükləmə (base64 və ya remote URL ilə)
export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body; // raw string, base64 və ya URL

    if (!image) {
      return res.status(400).json({ message: "Şəkil tapılmadı" });
    }

    // Cloudinary-ə yüklə
    const result = await cloudinary.uploader.upload(image, {
      folder: "", // folder olmadan
    });

    // DB-də saxla
    const newImage = new Image({
      images: [result.secure_url],
    });

    await newImage.save();

    res.status(201).json({
      message: "Şəkil uğurla yükləndi ✅",
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

// 🔹 Bütün şəkilləri gətirmək
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();

    res.status(200).json({
      message: "Şəkillər uğurla alındı ✅",
      count: images.length,
      images,
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

// 🔹 Şəkil silmə (DB və Cloudinary)
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const imageDoc = await Image.findById(id);
    if (!imageDoc) {
      return res.status(404).json({ message: "Şəkil tapılmadı" });
    }

    // Cloudinary-dən silmək üçün hər URL-dən public_id əldə etmək lazımdır
    for (const url of imageDoc.images) {
      const public_id = url.split("/").pop().split(".")[0]; // sadələşdirilmiş nümunə
      await cloudinary.uploader.destroy(public_id);
    }

    await imageDoc.remove();

    res.status(200).json({
      message: "Şəkil uğurla silindi ✅",
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};
