import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../modules/user/user.interface";
import { Types } from "mongoose";

export interface IJwtPayload {
  userId: Types.ObjectId | string;
  role: UserRole;
  isActive: boolean;
}

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string | any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
