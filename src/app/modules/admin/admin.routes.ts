
import express from "express"
import { adminControllers } from "./admin.controller"
const router = express.Router()

// Registration route
router.post("/registration",  adminControllers.registration);

// Login route
// router.post("/login", adminControllers.login);

export const adminRoutes = router;