import AppError from "../../errors/appError";
import { IUser, UserRole } from "./user.interface";
import httpStatus from "http-status";
import User from "./user.model";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import config from "../../config";

const registerUser = async (payload: IUser) => {
  if ([UserRole.ADMIN].includes(payload?.role)) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid user info!");
  }

  await User.isUserExists(payload?.email, payload?.phoneNumber);

  const user = await User.create(payload);
  const { _id, role, isActive } = user;

  const jwtPayload: IJwtPayload = {
    userId: _id as string,
    role,
    isActive,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getMyProfile = async (payload: IJwtPayload) => {
  const user = await User.findById(payload.userId);
  return user;
};

const banAUser = async (id: string) => {
  const user = await User.isUserExistsById(id);
  if (user?.role === UserRole.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't ban an admin");
  }
  user.isActive = false;
  await user.save();
  return user;
};

const unBanAUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  return user;
};

export const UserService = {
  registerUser,
  getAllUsers,
  getMyProfile,
  banAUser,
  unBanAUser,
};
