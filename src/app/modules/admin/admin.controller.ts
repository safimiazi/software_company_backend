import { adminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";
import { adminModel } from "./admin.model";

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

const login_admin = catchAsync(async (req, res) => {
  const data = req.body;
  const access_token = await adminServices.login_admin_into_db(data);

  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is login successfully.",
    data: {},
  });
});
const logout_admin = catchAsync(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin logged out successfully.",
    data: {},
  });
});

const get_admin_data = catchAsync(async (req, res) => {
  const data = req.user;

  const result = await adminModel.findOne({ _id: data.id });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data is retrive successfully.",
    data: result,
  });
});


export const adminControllers = {
  create_admin,
  login_admin,
  get_admin_data,
  logout_admin
};
