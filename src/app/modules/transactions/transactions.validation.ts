import { z } from "zod";
import mongoose from "mongoose";
import { TransactionStatus } from "./transactions.interface";

export const transactionValidationSchema = z.object({
  body: z.object({
    itemId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid item ID",
    }),
    status: z
      .enum([
        TransactionStatus.PENDING,
        TransactionStatus.COMPLETED,
        TransactionStatus.CANCELED,
      ])
      .default(TransactionStatus.PENDING),
  }),
});
