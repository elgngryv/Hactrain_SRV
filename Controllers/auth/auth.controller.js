import User from "../../Models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Şifrələr uyğun gəlmir" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Bu istifadəçi artıq mövcuddur" });
    }

    const newUser = new User({ username, email, password, confirmPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "Qeydiyyat uğurlu oldu ✅", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -confirmPassword");

    res.status(200).json({
      message: "İstifadəçilər uğurla alındı ✅",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Şifrə yalnışdır" });
    }

    // 🔑 Token yaradılır
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login uğurlu oldu ✅",
      token, 
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};
