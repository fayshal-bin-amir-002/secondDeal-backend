import { Schema, model, Document } from "mongoose";
import { IUser, UserModel, UserRole } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.statics.isUserExists = async (email: string, phone: string) => {
  const existingUser = await User.findOne({
    $or: [{ email: email }, { phoneNumber: phone }],
  });
  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This Email/Phone Number is already registered"
    );
  }
  return existingUser;
};

userSchema.statics.isUserExistsByCredentials = async (credentials: string) => {
  const existingUser = await User.findOne({
    $or: [{ email: credentials }, { phoneNumber: credentials }],
  });
  if (!existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This Email/Phone Number is not registered. Please register first."
    );
  }
  return existingUser;
};

userSchema.statics.isUserExistsById = async (id: string) => {
  const existingUser = await User.findById(id).select("+password");
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  if (!existingUser?.isActive) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  return existingUser;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
