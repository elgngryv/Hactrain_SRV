import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../../Controllers/auth/auth.controller.js";

const router = express.Router();

// register
router.post("/register", registerUser);
router.get("/users", getAllUsers);
// login
router.post("/login", loginUser);

export default router;
