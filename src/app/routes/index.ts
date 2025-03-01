import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ListingRoutes } from "../modules/listing/listing.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { TransactionsRoutes } from "../modules/transactions/transactions.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/listings",
    route: ListingRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/transactions",
    route: TransactionsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
