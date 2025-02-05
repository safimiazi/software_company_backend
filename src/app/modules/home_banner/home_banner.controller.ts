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
const admin_put_home_banner = catchAsync(
  async (req: IHomeBannerRequestWithFile, res) => {
    const { title, description, ctaText, ctaLink } = req.body;
    const filename = req.file ? req.file.filename : null; // Check if file exists
const {id} = req.params;
console.log("dddd", id)



    const result = ""
    // await homeBannerServices.admin_post_home_banner_into_db({
    //   title,
    //   description,
    //   ctaText,
    //   ctaLink,
    //   filename,
    // });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Banner is saved successfully.",
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
const get_home_banner_images = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await homeBannerServices.get_home_banner_image_into_db(id);
  res.sendFile(result);
});

export const homeBannerControllers = {
  admin_post_home_banner,
  get_home_banner_data,
  get_home_banner_images,
  admin_put_home_banner
};
