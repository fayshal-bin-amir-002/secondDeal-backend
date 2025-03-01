import { Router } from "express";
import { ListingController } from "./listing.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import { listingValidation } from "./listing.validation";

const router = Router();

// Define routes
router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(listingValidation),
  ListingController.postAnItemIntoListing
);

export const ListingRoutes = router;
