import { Schema, model } from "mongoose";
import { IAuth } from "./auth.interface";

const authSchema = new Schema<IAuth>({
  credential: { type: String, required: true },
  password: { type: String, required: true },
});

const Auth = model<IAuth>("Auth", authSchema);

export default Auth;
