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

export const ListingController = {
  postAnItemIntoListing,
};
