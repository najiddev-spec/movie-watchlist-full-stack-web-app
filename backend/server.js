import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  } catch (error) {
    console.log("DB connection failed:", error.message);
    process.exit(1);
  }
};
start();
