import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { IServiceRequestWithFile } from "./home_services.interface";
import { services_db } from "./home_services.service";

// home_services.controller.ts - home_services module
const admin_post_Services = catchAsync(
  async (req: IServiceRequestWithFile, res) => {
    const result = await services_db.admin_post_services_into_db(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Service is saved successfully.",
      data: result,
    });
  }
);

export const serviceController = {
  admin_post_Services,
};
