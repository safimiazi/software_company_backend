import { adminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const create_admin = catchAsync(async (req, res) => {
  // Extract data from request body
  const data = req.body;

  // Register the admin in the database
  const result = await adminServices.create_admin_into_db(data);

  // Send a success response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is created succesfully.",
    data: result,
  });
});

export const adminControllers = {
  create_admin,
};
