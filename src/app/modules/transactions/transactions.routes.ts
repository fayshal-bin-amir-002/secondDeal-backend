import { Router } from "express";
import { TransactionsController } from "./transactions.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import {
  transactionStatusValidation,
  transactionValidationSchema,
} from "./transactions.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(transactionValidationSchema),
  TransactionsController.createTransaction
);

router.patch(
  "/:id",
  auth(UserRole.USER),
  validateRequest(transactionStatusValidation),
  TransactionsController.updateTransactionStatus
);

router.get(
  "/",
  auth(UserRole.ADMIN),
  TransactionsController.getAllTransactions
);

router.get(
  "/purchases",
  auth(UserRole.USER),
  TransactionsController.getUserPurchases
);

router.get("/sales", auth(UserRole.USER), TransactionsController.getUserSales);

export const TransactionsRoutes = router;
