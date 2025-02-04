import express from "express";
import { adminControllers } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminLoginValidationSchema, adminValidationSchema } from "./admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/constant";

const router = express.Router();




router.post("/create", validateRequest(adminValidationSchema), adminControllers.create_admin);
router.post("/login", validateRequest(adminLoginValidationSchema), adminControllers.login_admin)
router.post("/logout", adminControllers.logout_admin)
router.get("/get_admin_data", auth(USER_ROLE.admin), adminControllers.get_admin_data)

export const adminRoutes = router;
