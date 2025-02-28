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
    userId: _id,
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

const getMyProfile = async (payload: IJwtPayload) => {
  const user = await User.findById(payload.userId);
  return user;
};

export const UserService = {
  registerUser,
  getMyProfile,
};
