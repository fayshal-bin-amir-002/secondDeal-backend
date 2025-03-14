import { Schema, model } from "mongoose";
import {
  Condition,
  IListing,
  ListingModel,
  ListingStatus,
} from "./listing.interface";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const listingSchema = new Schema<IListing, ListingModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    condition: {
      type: String,
      enum: Object.values(Condition),
      required: true,
    },
    images: { type: [String], required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(ListingStatus),
      default: ListingStatus.AVAILABLE,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

listingSchema.statics.isItemExists = async (id: string) => {
  const item = await Listing.findById(id);
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found!");
  }
  return item.populate("userId category");
};

const Listing = model<IListing, ListingModel>("Listing", listingSchema);

export default Listing;
