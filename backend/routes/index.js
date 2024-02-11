import { Router } from "express";
import authRoute from "./auth.route";
import chatRoute from "./chat.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
