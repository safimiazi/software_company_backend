// project.routes.ts - project module
import express from "express";

import { uploadService } from "../upload/upload";
import { projectValidationSchema } from "./project.validation";
import { projectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/post_project_data",
  uploadService.single("image"),
  validateRequest(projectValidationSchema),
  projectController.post_project
);
router.put(
  "/put_project_data/:id",
  uploadService.single("image"),
  validateRequest(projectValidationSchema),
  projectController.put_project
);
router.delete("/delete_project_data/:id", projectController.delete_project);
router.get("/get_project_data", projectController.get_project);

export const projectRoutes = router;
