import { model, Schema } from "mongoose";
import { IMessage } from "./message.interface";

const messageSchema = new Schema<IMessage>(
  {
    message: { type: String, required: false, default: "" },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
