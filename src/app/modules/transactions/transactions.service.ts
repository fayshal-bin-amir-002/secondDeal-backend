import mongoose, { Types } from "mongoose";
import { IJwtPayload } from "../../utils/token.utils";
import User from "../user/user.model";
import { ITransaction, TransactionStatus } from "./transactions.interface";
import Transaction from "./transactions.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import Listing from "../listing/listing.model";
import { ListingStatus } from "../listing/listing.interface";

const createTransaction = async (buyer: IJwtPayload, payload: ITransaction) => {
  const item = await Transaction.isItemAvailable(payload?.itemId);
  await User.isUserExistsById(buyer?.userId);
  await User.isUserExistsById(item?.userId?._id);

  const isTransactionExists = await Transaction.findOne({
    itemId: payload?.itemId,
    buyerId: buyer?.userId,
  });
  if (isTransactionExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please wait for seller confirmation."
    );
  }

  const data = {
    ...payload,
    buyerId: buyer?.userId,
    sellerId: item?.userId?._id,
  };

  const result = (await Transaction.create(data)).populate(
    "itemId sellerId buyerId"
  );
  return result;
};

const updateTransactionStatus = async (
  id: string | Types.ObjectId,
  status: TransactionStatus.COMPLETED | TransactionStatus.CANCELED,
  user: IJwtPayload
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const transaction = await Transaction.isTransactionExists(id);

    if (transaction?.status === status) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Transaction is already in this status"
      );
    }

    if (
      transaction.status === TransactionStatus.COMPLETED ||
      transaction.status === TransactionStatus.CANCELED
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Transaction can not be updated"
      );
    }

    if (user?.userId !== transaction?.sellerId?._id.toString()) {
      console.log(user?.userId);
      console.log(transaction?.sellerId?._id.toString());
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You can't update this transaction"
      );
    }

    const result = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("itemId sellerId buyerId");

    if (status === TransactionStatus.COMPLETED) {
      await Listing.findByIdAndUpdate(id, { status: ListingStatus.SOLD });
    }

    await session.commitTransaction();

    return result;
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw err;
  } finally {
    session.endSession();
  }
};

const getAllTransactions = async () => {
  const result = await Transaction.find().populate("itemId sellerId buyerId");
  return result;
};

const getUserPurchases = async (user: IJwtPayload) => {
  await User.isUserExistsById(user?.userId);
  const result = await Transaction.find({ buyerId: user?.userId }).populate(
    "itemId sellerId buyerId"
  );

  return result;
};

const getUserSales = async (user: IJwtPayload) => {
  await User.isUserExistsById(user?.userId);
  const result = await Transaction.find({ sellerId: user?.userId }).populate(
    "itemId sellerId buyerId"
  );

  return result;
};

export const TransactionsService = {
  createTransaction,
  updateTransactionStatus,
  getAllTransactions,
  getUserPurchases,
  getUserSales,
};
