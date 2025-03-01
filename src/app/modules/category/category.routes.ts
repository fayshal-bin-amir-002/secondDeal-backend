import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = Router();

// Define routes
router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(categoryValidation),
  CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategory);

export const CategoryRoutes = router;
