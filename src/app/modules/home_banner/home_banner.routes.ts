import express from "express";
import { homeBannerControllers } from "./home_banner.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { HomeBannerValidationSchema } from "./home_banner.validation";
import { photoComposure } from "../../middlewares/photoComposure";
import { uploadService } from "../upload/upload";

const router = express.Router();

const { configurableCompression } = photoComposure();

router.post(
  "/post_home_banner_data",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),
  validateRequest(HomeBannerValidationSchema),
  homeBannerControllers.admin_post_home_banner
);
router.put(
  "/put_home_banner_data/:id",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),
  validateRequest(HomeBannerValidationSchema),
  homeBannerControllers.admin_put_home_banner
);
router.delete(
  "/delete_home_banner_data/:id",
  homeBannerControllers.admin_delete_home_banner
);
router.get(
  "/get_home_page_banner_data",
  homeBannerControllers.get_home_banner_data
);
router.get(
  "/get_home_page_banner_images/:id",
  homeBannerControllers.get_home_banner_images
);

export const homeBannerRoutes = router;
