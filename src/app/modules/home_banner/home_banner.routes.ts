import express from "express";
import path from "path";
import {  getMuler } from "../../middlewares/multer";
import { homeBannerControllers } from "./home_banner.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { HomeBannerValidationSchema } from "./home_banner.validation";
import { photoComposure } from "../../middlewares/photoComposure";

const router = express.Router();

const upload_file_destination_path = path.join(__dirname, "../../upload_files");

const upload = getMuler({
  upload_file_destination_path,
  regex: /jpeg|jpg|png|pdf/,
  images: "jpg, jpeg, png, pdf",
});
const { configurableCompression } = photoComposure();


router.post("/post_home_banner_data", upload.single("image"),   configurableCompression("jpeg", 60),validateRequest(HomeBannerValidationSchema), homeBannerControllers.admin_post_home_banner )
router.put("/put_home_banner_data/:id", upload.single("image"),   configurableCompression("jpeg", 60),validateRequest(HomeBannerValidationSchema), homeBannerControllers.admin_put_home_banner )
router.delete("/delete_home_banner_data/:id", homeBannerControllers.admin_delete_home_banner )
router.get("/get_home_page_banner_data", homeBannerControllers.get_home_banner_data )
router.get("/get_home_page_banner_images/:id", homeBannerControllers.get_home_banner_images )

 export const homeBannerRoutes = router;