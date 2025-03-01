import { Schema, model, Document, Types } from "mongoose";
import {
  ITransaction,
  TransactionModel,
  TransactionStatus,
} from "./transactions.interface";
import Listing from "../listing/listing.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { ListingStatus } from "../listing/listing.interface";

const transactionsSchema = new Schema<ITransaction, TransactionModel>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);

transactionsSchema.statics.isItemAvailable = async (
  id: string | Types.ObjectId
) => {
  const item = await Listing.findById(id);
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found!");
  }
  if (item.status === ListingStatus.SOLD) {
    throw new AppError(httpStatus.BAD_REQUEST, "Item is already sold");
  }
  return await item.populate("userId category");
};

const Transaction = model<ITransaction, TransactionModel>(
  "Transactions",
  transactionsSchema
);

export default Transaction;
