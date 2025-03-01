import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthService.loginUser(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: config.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
    },
  });
});

export const AuthController = {
  loginUser,
};
