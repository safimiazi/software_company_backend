// home_banner.controller.ts - home_banner module

import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { homeBannerServices } from "./home_banner.service";
import { IHomeBannerRequestWithFile } from "./home_banner.interface";

const admin_post_home_banner = catchAsync(
  async (req: IHomeBannerRequestWithFile, res) => {
    const { title, description, ctaText, ctaLink } = req.body;
    const filename = req.file ? req.file.filename : null; // Check if file exists

    const result = await homeBannerServices.admin_post_home_banner_into_db({
      title,
      description,
      ctaText,
      ctaLink,
      filename,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Banner is saved successfully.",
      data: result,
    });
  }
);

export const homeBannerControllers = {
  admin_post_home_banner,
};
