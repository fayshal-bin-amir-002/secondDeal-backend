import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await UserService.registerUser(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: config.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registration completed successfully!",
    data: {
      accessToken,
    },
  });
});

export const UserController = {
  registerUser,
};
