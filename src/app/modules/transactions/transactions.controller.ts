import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TransactionsService } from "./transactions.service";
import { IJwtPayload } from "../../utils/token.utils";

const createTransaction = catchAsync(async (req, res) => {
  const result = await TransactionsService.createTransaction(
    req.user as IJwtPayload,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Transaction is succeeded. Please wait for seller confirmation.",
    data: result,
  });
});

const updateTransactionStatus = catchAsync(async (req, res) => {
  const result = await TransactionsService.updateTransactionStatus(
    req.params.id,
    req.body.status,
    req.user as IJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Transaction status updated successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await TransactionsService.getAllTransactions();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrieved all transactions successfully.",
    data: result,
  });
});

const getUserPurchases = catchAsync(async (req, res) => {
  const result = await TransactionsService.getUserPurchases(
    req.user as IJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrieved all purchases successfully.",
    data: result,
  });
});

const getUserSales = catchAsync(async (req, res) => {
  const result = await TransactionsService.getUserSales(
    req.user as IJwtPayload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrieved all sales successfully.",
    data: result,
  });
});

export const TransactionsController = {
  createTransaction,
  updateTransactionStatus,
  getAllTransactions,
  getUserPurchases,
  getUserSales,
};
