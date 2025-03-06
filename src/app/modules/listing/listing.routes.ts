import { Router } from "express";
import { ListingController } from "./listing.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import {
  listingValidation,
  updateListingValidation,
} from "./listing.validation";

const router = Router();

// Define routes
router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(listingValidation),
  ListingController.postAnItemIntoListing
);

router.get(
  "/my-listing",
  auth(UserRole.USER),
  ListingController.getUserListingItems
);

router.get("/", ListingController.getAllListingItems);

router.get("/available-items", ListingController.getAllAvailableListingItems);

router.get("/:id", ListingController.getASingleListingItem);

router.patch(
  "/:id",
  auth(UserRole.USER),
  validateRequest(updateListingValidation),
  ListingController.updateAListingItem
);

router.delete(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  ListingController.deleteAListingItem
);

export const ListingRoutes = router;
