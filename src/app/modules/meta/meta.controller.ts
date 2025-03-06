import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IJwtPayload } from "../../utils/token.utils";
import { MetaService } from "./meta.service";
import httpStatus from "http-status";

const getMetaData = catchAsync(async (req, res) => {
  const result = await MetaService.getMetaData(req.user as IJwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrieved metadata successfully",
    data: result,
  });
});

export const MetaController = {
  getMetaData,
};
