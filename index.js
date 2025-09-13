import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/auth/auth.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Cors
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://192.168.0.226:8080",
      "https://hacktrain.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api", userRouter);

// Route test
app.get("/", (req, res) => {
  res.send("Server işləyir 🚀");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});
