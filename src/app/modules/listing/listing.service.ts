import { IListing } from "./listing.interface";
import Listing from "./listing.model";
import { IJwtPayload } from "../../utils/token.utils";
import { Types } from "mongoose";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import User from "../user/user.model";

const postAnItemIntoListing = async (user: IJwtPayload, payload: IListing) => {
  const userInfo = await User.isUserExistsById(user?.userId);
  const item = {
    ...payload,
    userId: userInfo?._id,
    location: userInfo?.location,
  };

  const result = (
    await (await Listing.create(item)).populate("userId")
  ).populate("category");
  return result;
};

const getAllListingItems = async (query: Record<string, unknown>) => {
  const listingItemsQuery = new QueryBuilder(Listing.find(), query)
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await listingItemsQuery.modelQuery
    .populate("userId")
    .populate("category");

  const meta = await listingItemsQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAllAvailableListingItems = async (query: Record<string, unknown>) => {
  const listingItemsQuery = new QueryBuilder(
    Listing.find({ status: "Available" }),
    query
  )
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await listingItemsQuery.modelQuery
    .populate("userId")
    .populate("category");

  const meta = await listingItemsQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getUserListingItems = async (
  user: IJwtPayload,
  query: Record<string, unknown>
) => {
  const listingItemsQuery = new QueryBuilder(
    Listing.find({ userId: user?.userId }),
    query
  )
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await listingItemsQuery.modelQuery
    .populate("userId")
    .populate("category");
  const meta = await listingItemsQuery.countTotal();
  return {
    result,
    meta,
  };
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
  getUserListingItems,
  getAllAvailableListingItems,
};
