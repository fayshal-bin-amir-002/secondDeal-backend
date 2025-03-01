import { Router } from "express";
import { TransactionsController } from "./transactions.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import { transactionValidationSchema } from "./transactions.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(transactionValidationSchema),
  TransactionsController.createTransaction
);

export const TransactionsRoutes = router;
