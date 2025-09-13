import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../Controllers/auth/auth.controller.js";

const router = express.Router();

// register
router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.get("/info/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// login
router.post("/login", loginUser);

export default router;
