// project.routes.ts - project module
import express from "express";

import { uploadService } from "../upload/upload";
import { projectValidationSchema } from "./project.validation";
import { projectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { photoComposure } from "../../middlewares/photoComposure";
const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/post_project_data",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),

  validateRequest(projectValidationSchema),
  projectController.post_project
);
router.put(
  "/put_project_data/:id",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),

  validateRequest(projectValidationSchema),
  projectController.put_project
);
router.delete("/delete_project_data/:id", projectController.delete_project);
router.get("/get_project_data", projectController.get_project);

export const projectRoutes = router;
