import { Schema, model } from "mongoose";
import { IUser, Locations, UserModel, UserRole } from "./user.interface";
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
    location: { type: String, enum: Object.values(Locations), required: true },
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

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    return {
      _id: ret._id,
      name: ret.name,
      email: ret.email,
      phoneNumber: ret.phoneNumber,
      location: ret.location,
      isActive: ret.isActive,
      role: ret.role,
    };
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// checking that user is exists with email or phone
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

// checking that user is exists with credential(email or phone)
userSchema.statics.isUserExistsByCredentials = async (credential: string) => {
  const existingUser = await User.findOne({
    $or: [{ email: credential }, { phoneNumber: credential }],
  }).select("+password");
  if (!existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This Email/Phone Number is not registered. Please register first."
    );
  }
  if (!existingUser?.isActive) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  return existingUser;
};

// checking that user is exists with id
userSchema.statics.isUserExistsById = async (id: string) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  if (!existingUser?.isActive) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `${existingUser?.name || "User"} is blocked`
    );
  }
  return existingUser;
};

// checking that password is matched  or not
userSchema.statics.isPasswordMatched = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  const isPasswordMatched = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong password");
  }
  return isPasswordMatched;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
