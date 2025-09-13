import express from "express";
import {
  registerUser,
  loginUser,
} from "../../Controllers/auth/auth.controller.js";

const router = express.Router();

// register
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

export default router;
