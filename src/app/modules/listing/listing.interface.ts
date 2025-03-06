import { Document, Model, Types } from "mongoose";

export enum ListingStatus {
  AVAILABLE = "Available",
  SOLD = "Sold",
}

export enum Condition {
  NEW = "New",
  USED = "Used",
}

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  condition: Condition;
  images: string[];
  userId: Types.ObjectId;
  status: ListingStatus;
  category: Types.ObjectId;
  location: string;
}

export interface ListingModel extends Model<IListing> {
  isItemExists(id: string | Types.ObjectId): Promise<IListing>;
}
