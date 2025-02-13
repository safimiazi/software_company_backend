// home_about.controller.ts - home_about module

import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import path from "path";
import fs from "fs";
import { homeAboutServices } from "./home_about.service";
import { IHomeAboutRequestWithFile } from "./home_about.interface";
import HomeAboutModel from "./home_about.model";

const admin_post_home_about = catchAsync(
  async (req: IHomeAboutRequestWithFile, res) => {
    const { title, description, heading, ctaText, ctaLink } = req.body;
    const filePath = req.file ? req.file.path : undefined;

    const result = await homeAboutServices.admin_post_home_about_into_db({
      title,
      description,
      heading,
      ctaText,
      ctaLink,
      filename: filePath,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "About is saved successfully.",
      data: result,
    });
  }
);
const admin_put_home_about = catchAsync(
  async (req: IHomeAboutRequestWithFile, res) => {
    const { title, description, heading, ctaText, ctaLink } = req.body;
    const new_file_path = req.file ? req.file.path : undefined; // নতুন ফাইল থাকলে সেট করো
    const { id } = req.params;

    // ID দিয়ে ডাটাবেজ থেকে ব্যানার খোঁজা
    const findExistingDataById = await HomeAboutModel.findOne({ _id: id });

    // যদি ব্যানার পাওয়া যায়
    if (findExistingDataById) {
      // পুরানো ফাইলের নাম বের করো

      const old_file_name = findExistingDataById?.image
        ? findExistingDataById.image.match(/[^\\]+$/)?.[0]
        : undefined;

      const old_file_path = old_file_name
        ? path.join(__dirname, "../../../../uploads", old_file_name)
        : null;

      // যদি নতুন ফাইল থাকে, তাহলে পুরানো ফাইল ডিলিট করো
      if (
        new_file_path !== null &&
        old_file_path &&
        fs.existsSync(old_file_path)
      ) {
        fs.unlinkSync(old_file_path);
      }
    }

    // ব্যানার আপডেট করো
    const result = await homeAboutServices.admin_put_home_about_into_db({
      id,
      title,
      description,
      ctaText,
      ctaLink,
      heading,
      filename: new_file_path || findExistingDataById?.image, // নতুন ইমেজ না থাকলে আগেরটাই রাখো
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "About is edited successfully.",
      data: result,
    });
  }
);

const get_home_about_data = catchAsync(async (req, res) => {
  const result = await homeAboutServices.get_home_about_into_db(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "About data is retrived successfully.",
    data: result,
  });
});
const get_home_about_images = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await homeAboutServices.get_home_about_image_into_db(id);
  res.sendFile(result);
});

const admin_delete_home_about = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = homeAboutServices.home_about_data_delete_db(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Home about deleted successfully",
    data: result,
  });
});

export const homeAboutControllers = {
  admin_post_home_about,
  get_home_about_data,
  get_home_about_images,
  admin_put_home_about,
  admin_delete_home_about,
};
