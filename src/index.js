import express from "express";
import dotenv from "dotenv";
import { query } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MiniTube API ishlayapti",
  });
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await query("SELECT NOW()");

    console.log("PostgreSQL connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} port`);
    });
  } catch (error) {
    console.error("Serverni ishga tushirishda xato:", error.message);
    process.exit(1);
  }
}

startServer();
