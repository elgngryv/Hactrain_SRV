import express from "express";
import {
  uploadImage,
  deleteImage,
  getAllImages,
} from "../Controllers/image.controller.js";
import fileUpload from "express-fileupload";

const router = express.Router();

// 🔹 Express-fileupload middleware
router.use(fileUpload({ useTempFiles: true }));

router.post("/upload", uploadImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

export default router;
