import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IJwtPayload } from "../../utils/token.utils";
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
      refreshToken,
    },
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const { result, meta } = await UserService.getAllUsers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
    meta: meta,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const result = await UserService.getMyProfile(req.user as IJwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const banAUser = catchAsync(async (req, res) => {
  const user = await UserService.banAUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User banned successfully",
    data: user,
  });
});

const unBanAUser = catchAsync(async (req, res) => {
  const user = await UserService.unBanAUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User unbanned successfully",
    data: user,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const result = await UserService.updateUserProfile(
    req.user as IJwtPayload,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserController = {
  registerUser,
  getAllUsers,
  getMyProfile,
  banAUser,
  unBanAUser,
  updateUserProfile,
};
