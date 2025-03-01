import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

// Define routes
router.post(
  "/login",
  validateRequest(authValidation),
  AuthController.loginUser
);

export const AuthRoutes = router;
