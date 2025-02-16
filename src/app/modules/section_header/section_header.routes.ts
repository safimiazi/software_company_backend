// section_header.routes.ts - section_header module
// home_services.routes.ts - home_services module
import express from "express";
import { sectionHeaderController } from "./section_header.controller";

const router = express.Router();

router.post(
  "/post_section_header_data",
  sectionHeaderController.admin_post_section_header
);
router.put(
  "/put_section_header_data/:id",
  sectionHeaderController.admin_put_section_header
);
router.delete(
  "/delete_section_header_data/:id",
  sectionHeaderController.admin_delete_section_header
);
router.get(
  "/get_section_header_data",
  sectionHeaderController.admin_get_section_header
);

export const SectionHeaderRoutes = router;
