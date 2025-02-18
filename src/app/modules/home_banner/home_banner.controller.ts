// home_banner.controller.ts - home_banner module

import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { homeBannerServices } from "./home_banner.service";
import { IHomeBannerRequestWithFile } from "./home_banner.interface";
import HomeBannerModel from "./home_banner.model";
import path from "path";
import fs from "fs";

const admin_post_home_banner = catchAsync(
  async (req: IHomeBannerRequestWithFile, res) => {
    const { title, description, ctaText, ctaLink } = req.body;
    const filePath = req.file ? req.file.path : undefined;
    const result = await homeBannerServices.admin_post_home_banner_into_db({
      title,
      description,
      ctaText,
      ctaLink,
      image: filePath,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Banner is saved successfully.",
      data: result,
    });
  }
);
const admin_put_home_banner = catchAsync(
  async (req: IHomeBannerRequestWithFile, res) => {
    const { title, description, ctaText, ctaLink } = req.body;
    const new_file_path = req.file ? req.file.path : undefined;
    const { id } = req.params;

    // ID দিয়ে ডাটাবেজ থেকে ব্যানার খোঁজা
    const findExistingDataById = await HomeBannerModel.findOne({ _id: id });

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
    const result = await homeBannerServices.admin_put_home_banner_into_db({
      id,
      title,
      description,
      ctaText,
      ctaLink,
      filename: new_file_path || findExistingDataById?.image, // নতুন ইমেজ না থাকলে আগেরটাই রাখো
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Banner is edited successfully.",
      data: result,
    });
  }
);

const get_home_banner_data = catchAsync(async (req, res) => {
  const result = await homeBannerServices.get_home_banner_into_db(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Banner data is retrived successfully.",
    data: result,
  });
});

const admin_delete_home_banner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = homeBannerServices.home_banner_data_delete_db(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Home banner deleted successfully",
    data: result,
  });
});

export const homeBannerControllers = {
  admin_post_home_banner,
  get_home_banner_data,
  admin_put_home_banner,
  admin_delete_home_banner,
};
