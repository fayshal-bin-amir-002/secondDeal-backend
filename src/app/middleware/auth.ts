import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import AppError from "../errors/appError";
import { UserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import config from "../config";
import User from "../modules/user/user.model";

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }

    try {
      const decode = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      const { userId, role, isActive } = decode;
      await User.isUserExistsById(userId);
      if (!isActive) {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
      }
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
      }

      req.user = decode as JwtPayload & { role: string };
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            "Token expired, please login again"
          )
        );
      }
      return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token"));
    }
  });
};

export default auth;
