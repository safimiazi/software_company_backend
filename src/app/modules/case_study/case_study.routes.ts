// case_study.routes.ts - case_study module
import express from "express";

import { uploadService } from "../upload/upload";
import { validateRequest } from "../../middlewares/validateRequest";
import { photoComposure } from "../../middlewares/photoComposure";
import {
  CaseStudyEditValidationSchema,
  CaseStudyValidationSchema,
} from "./case_study.validation";
import { CaseStudyController } from "./case_study.controller";
const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/post_case_study_data",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),

  validateRequest(CaseStudyValidationSchema),
  CaseStudyController.post_case_study
);
router.put(
  "/put_case_study_data/:id",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),

  validateRequest(CaseStudyEditValidationSchema),
  CaseStudyController.put_case_study
);
router.delete(
  "/delete_case_study_data/:id",
  CaseStudyController.delete_case_study
);
router.get("/get_case_study_data", CaseStudyController.get_case_study);

export const CaseStudyRoutes = router;
