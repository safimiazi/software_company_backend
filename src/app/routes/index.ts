import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";
import { homeBannerRoutes } from "../modules/home_banner/home_banner.routes";
import { homeAboutRoutes } from "../modules/home_about/home_about.routes";
import { ServicesRoutes } from "../modules/home_services/home_services.routes";
import { SectionHeaderRoutes } from "../modules/section_header/section_header.routes";

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
  {
    path: "/home_about",
    route: homeAboutRoutes,
  },
  {
    path: "/services",
    route: ServicesRoutes,
  },
  {
    path: "/section_header",
    route: SectionHeaderRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
