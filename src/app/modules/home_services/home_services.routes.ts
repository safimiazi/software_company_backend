// home_services.routes.ts - home_services module
import express from "express";
import {
  servicePutValidationSchema,
  serviceValidationSchema,
} from "./home_services.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { serviceController } from "./home_services.controller";
import { uploadService } from "../upload/upload";
const router = express.Router();



router.post(
  "/post_services_data",
  uploadService.single("image"),
  validateRequest(serviceValidationSchema),
  serviceController.admin_post_Services
);
router.put(
  "/put_services_data/:id",
  uploadService.single("image"),
  validateRequest(servicePutValidationSchema),
  serviceController.admin_put_Services
);
router.delete(
  "/delete_services_data/:id",
  serviceController.admin_delete_services
);
router.get("/get_services_data", serviceController.admin_get_services);

export const ServicesRoutes = router;
