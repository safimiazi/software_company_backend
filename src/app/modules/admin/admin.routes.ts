import express from "express";
import { adminControllers } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminLoginValidationSchema, adminValidationSchema } from "./admin.validation";
const router = express.Router();

router.post("/create", validateRequest(adminValidationSchema), adminControllers.create_admin);
router.post("/login", validateRequest(adminLoginValidationSchema), adminControllers.login_admin)
export const adminRoutes = router;
