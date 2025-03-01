import catchAsync from "../../utils/catchAsync";
import { IJwtPayload } from "../../utils/token.utils";
import { ListingService } from "./listing.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const postAnItemIntoListing = catchAsync(async (req, res) => {
  const result = await ListingService.postAnItemIntoListing(
    req.user as IJwtPayload,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Item posted successfully",
    data: result,
  });
});

const getAllListingItems = catchAsync(async (req, res) => {
  const result = await ListingService.getAllListingItems();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved all listing items.",
    data: result,
  });
});

const getASingleListingItem = catchAsync(async (req, res) => {
  const result = await ListingService.getASingleListingItem(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved listing item.",
    data: result,
  });
});

const updateAListingItem = catchAsync(async (req, res) => {
  const result = await ListingService.updateAListingItem(
    req.params.id,
    req.body,
    req.user as IJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated listing item.",
    data: result,
  });
});

const deleteAListingItem = catchAsync(async (req, res) => {
  const result = await ListingService.deleteAListingItem(
    req.params.id,
    req.user as IJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted listing item.",
    data: result,
  });
});

export const ListingController = {
  postAnItemIntoListing,
  getAllListingItems,
  getASingleListingItem,
  updateAListingItem,
  deleteAListingItem,
};
