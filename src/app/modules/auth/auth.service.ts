import { Types } from "mongoose";
import User from "../user/user.model";
import { IAuth } from "./auth.interface";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import config from "../../config";

const loginUser = async (payload: IAuth) => {
  const user = await User.isUserExistsByCredentials(payload?.credential);
  const { _id, role, isActive, password } = user;

  await User.isPasswordMatched(payload?.password, password);

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

export const AuthService = {
  loginUser,
};
