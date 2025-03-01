import { Types } from "mongoose";
import { IJwtPayload } from "../../utils/token.utils";
import User from "../user/user.model";
import { ITransaction } from "./transactions.interface";
import Transaction from "./transactions.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

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

export const TransactionsService = {
  createTransaction,
};
