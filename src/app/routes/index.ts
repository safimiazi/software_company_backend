import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";
import { homeBannerRoutes } from "../modules/home_banner/home_banner.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/home_banner",
    route: homeBannerRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
