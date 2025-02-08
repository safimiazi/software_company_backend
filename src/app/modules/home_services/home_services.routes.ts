// home_services.routes.ts - home_services module
import express from "express";
import path from "path";
import { getMuler } from "../../middlewares/multer";
import { photoComposure } from "../../middlewares/photoComposure";
import { serviceValidationSchema } from "./home_services.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { serviceController } from "./home_services.controller";
const router = express.Router();

const upload_file_destination_path = path.join(__dirname, "../../upload_files");

const upload = getMuler({
  upload_file_destination_path,
  regex: /svg/,
  images: "svg",
});
const { configurableCompression } = photoComposure();


router.post("/post_services_data", upload.single("image"),validateRequest(serviceValidationSchema), serviceController.admin_post_Services)
router.put("/put_services_data/:id", upload.single("image"),validateRequest(serviceValidationSchema) )
router.delete("/delete_services_data/:id" )
router.get("/get_services_data")

 export const ServicesRoutes = router;