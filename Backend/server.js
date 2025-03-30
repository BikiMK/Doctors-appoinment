import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());

// CORS Setup
app.use(cors({
  origin: "http://localhost:3000", // Make sure this matches your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const cors = require("cors");
app.use(cors());

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
