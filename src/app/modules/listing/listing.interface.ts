import { Document, Model, Types } from "mongoose";

export enum ListingStatus {
  AVAILABLE = "available",
  SOLD = "sold",
}

export enum Condition {
  NEW = "new",
  USED = "used",
}

// export enum ListingCategory {
//   ELECTRONICS = "Electronics",
//   FURNITURE = "Furniture",
//   CLOTHING = "Clothing",
//   BOOKS = "Books",
//   VEHICLES = "Vehicles",
//   HOME_APPLIANCES = "Home Appliances",
//   TOYS = "Toys",
//   SPORTS = "Sports",
//   BEAUTY = "Beauty",
//   REAL_ESTATE = "Real Estate",
//   JOBS_SERVICES = "Jobs Services",
//   PETS = "Pets",
//   MUSIC = "Music",
//   OTHERS = "Others",
// }

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  condition: Condition;
  images: string[];
  userID: Types.ObjectId;
  status: ListingStatus;
  category: string;
}

export interface ListingModel extends Model<IListing> {
  isItemExists(id: string): Promise<IListing>;
}
