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

export const TransactionsController = {
  createTransaction,
};
