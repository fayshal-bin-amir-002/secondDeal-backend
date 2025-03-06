import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userUpdateValidation, userValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { UserRole } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidation),
  UserController.registerUser
);

router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);

router.get(
  "/getMe",
  auth(UserRole.ADMIN, UserRole.USER),
  UserController.getMyProfile
);

router.patch("/:id/ban", auth(UserRole.ADMIN), UserController.banAUser);

router.patch("/:id/unBan", auth(UserRole.ADMIN), UserController.unBanAUser);

router.patch(
  "/update-profile",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(userUpdateValidation),
  UserController.updateUserProfile
);

export const UserRoutes = router;
