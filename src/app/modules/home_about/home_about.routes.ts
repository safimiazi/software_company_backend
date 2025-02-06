// home_about.routes.ts - home_about module
import express from "express";
import path from "path";
import {  getMuler } from "../../middlewares/multer";
import { validateRequest } from "../../middlewares/validateRequest";
import { photoComposure } from "../../middlewares/photoComposure";
import { HomeAboutValidationSchema } from "./home_about.validation";
import { homeAboutControllers } from "./home_about.controller";

const router = express.Router();

const upload_file_destination_path = path.join(__dirname, "../../upload_files");

const upload = getMuler({
  upload_file_destination_path,
  regex: /jpeg|jpg|png|pdf/,
  images: "jpg, jpeg, png, pdf",
});
const { configurableCompression } = photoComposure();


router.post("/post_home_about_data", upload.single("image"),   configurableCompression("jpeg", 60),validateRequest(HomeAboutValidationSchema), homeAboutControllers.admin_post_home_about )
router.put("/put_home_about_data/:id", upload.single("image"),   configurableCompression("jpeg", 60),validateRequest(HomeAboutValidationSchema), homeAboutControllers.admin_put_home_about )
router.delete("/delete_home_about_data/:id", homeAboutControllers.admin_delete_home_about )
router.get("/get_home_page_about_data", homeAboutControllers.get_home_about_data )
router.get("/get_home_page_about_images/:id", homeAboutControllers.get_home_about_images )

 export const homeAboutRoutes = router;