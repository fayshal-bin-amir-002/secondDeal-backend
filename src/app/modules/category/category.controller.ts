import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
};
