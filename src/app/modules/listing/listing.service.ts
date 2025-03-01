import { IListing } from "./listing.interface";
import Listing from "./listing.model";
import { IJwtPayload } from "../../utils/token.utils";
import { Types } from "mongoose";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const postAnItemIntoListing = async (user: IJwtPayload, payload: IListing) => {
  const item = {
    ...payload,
    userId: user?.userId,
  };

  const result = (
    await (await Listing.create(item)).populate("userId")
  ).populate("category");
  return result;
};

const getAllListingItems = async () => {
  const items = await Listing.find().populate("userId").populate("category");
  return items;
};

const getASingleListingItem = async (id: string | Types.ObjectId) => {
  const item = await Listing.isItemExists(id);

  return item;
};

const updateAListingItem = async (
  id: string | Types.ObjectId,
  payload: Partial<IListing>,
  user: IJwtPayload
) => {
  const item = await Listing.isItemExists(id);

  if (item?.userId?._id.toString() !== user?.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't update this item");
  }

  const result = await Listing.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  );

  return result;
};

const deleteAListingItem = async (
  id: string | Types.ObjectId,
  user: IJwtPayload
) => {
  const item = await Listing.isItemExists(id);

  if (item?.userId?._id.toString() !== user?.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't delete this item");
  }

  await Listing.findByIdAndDelete(id);
};

export const ListingService = {
  postAnItemIntoListing,
  getAllListingItems,
  getASingleListingItem,
  updateAListingItem,
  deleteAListingItem,
};
