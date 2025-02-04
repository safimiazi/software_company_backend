import express from "express";
import path from "path";
import { compressFile, getMuler } from "../../middlewares/multer";
import { homeBannerControllers } from "./home_banner.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { HomeBannerValidationSchema } from "./home_banner.validation";

const router = express.Router();

const upload_file_destination_path = path.join(__dirname, "../../upload_files");

const upload = getMuler({
  upload_file_destination_path,
  regex: /jpeg|jpg|png|pdf/,
  images: "jpg, jpeg, png, pdf",
});


router.post("/post_home_banner_data", upload.single("image"), compressFile,validateRequest(HomeBannerValidationSchema), homeBannerControllers.admin_post_home_banner )
 export const homeBannerRoutes = router;