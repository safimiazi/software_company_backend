import express from "express";
import { adminControllers } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminLoginValidationSchema, adminValidationSchema } from "./admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/constant";
import { compressFile, getMuler } from "../../middlewares/multer";
import path from "path";

const router = express.Router();

const upload_file_destination_path = path.join(__dirname, "../../upload_files");

const upload = getMuler({
  upload_file_destination_path,
  regex: /jpeg|jpg|png|pdf/,
  images: "jpg, jpeg, png, pdf",
});


router.post("/create", validateRequest(adminValidationSchema), adminControllers.create_admin);
router.post("/login", validateRequest(adminLoginValidationSchema), adminControllers.login_admin)
router.post("/logout", adminControllers.logout_admin)
router.get("/get_admin_data", auth(USER_ROLE.admin), adminControllers.get_admin_data)

// home page:

router.post("/post_home_banner_data", upload.single("image"), compressFile, )
export const adminRoutes = router;
