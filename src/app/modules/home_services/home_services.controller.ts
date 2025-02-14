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
const admin_put_Services = catchAsync(
  async (req: IServiceRequestWithFile, res) => {
    const { id } = req.params;
    const result = await services_db.admin_put_services_into_db(id, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Service is edited successfully.",
      data: result,
    });
  }
);

const admin_delete_services = catchAsync(async(req, res)=> {
  const {id} = req.params;
  const result = services_db.admin_delete_services_into_db(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Services deleted successfully",
    data: result,
  });
})
const admin_get_services = catchAsync(async(req, res)=> {
  const result = await services_db.admin_get_services_into_db(req.query)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Services get successfully",
    data: result,
  });
})

export const serviceController = {
  admin_post_Services,
  admin_put_Services,
  admin_delete_services,
  admin_get_services
};
