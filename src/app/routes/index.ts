import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: adminRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
