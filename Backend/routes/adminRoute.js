import express from "express";
import {
  addDoctor,
  allDoctors,
  appointmentAdmin,
  appointmentCancel,
  loginAdmin,
  adminDashboard,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import upload from "../middlewares/multer.js";
import { changeAvailability } from "../controllers/doctorController.js";
router.get("/doctors", allDoctors);
const adminRouter = express.Router();

// Admin Login
adminRouter.post("/login", loginAdmin);

// Add a New Doctor
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

// Get All Doctors
adminRouter.get("/all-doctors", authAdmin, allDoctors);

// Change Doctor Availability
adminRouter.post("/change-availability", authAdmin, changeAvailability);

// Get All Appointments
adminRouter.get("/appointments", authAdmin, appointmentAdmin);

// Cancel an Appointment
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

// Get Admin Dashboard Data
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;