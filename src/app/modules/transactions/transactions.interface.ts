import { Document, Model, Types } from "mongoose";
import { IListing } from "../listing/listing.interface";

export enum TransactionStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export interface ITransaction extends Document {
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  itemId: Types.ObjectId;
  status: TransactionStatus;
}

export interface TransactionModel extends Model<ITransaction> {
  isItemAvailable(id: string | Types.ObjectId): Promise<IListing>;
  isTransactionExists(id: string | Types.ObjectId): Promise<ITransaction>;
}
