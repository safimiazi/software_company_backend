import express from "express";
import { adminControllers } from "./admin.controller";
const router = express.Router();

router.post("/create", adminControllers.create_admin);

export const adminRoutes = router;
