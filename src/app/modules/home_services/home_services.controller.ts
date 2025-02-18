import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { IServiceRequestWithFile } from "./home_services.interface";
import { services_db } from "./home_services.service";
import ServiceModel from "./home_services.model";
import path from "path"
import fs from "fs"

// home_services.controller.ts - home_services module
const admin_post_Services = catchAsync(
  async (req: IServiceRequestWithFile, res) => {
    const { title, description, ctaText, ctaLink,sectionHeader } = req.body;
    const filePath = req.file ? req.file.path : undefined;
    const result = await services_db.admin_post_services_into_db({
      title,
      description,
      ctaText,
      ctaLink, sectionHeader,
      image: filePath,
    });

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

    const { title, description, ctaText, ctaLink,  sectionHeader    } = req.body;
    const new_file_path = req.file ? req.file.path : undefined;
    const { id } = req.params;

    // ID দিয়ে ডাটাবেজ থেকে ব্যানার খোঁজা
    const findExistingDataById = await ServiceModel.findOne({ _id: id });

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
    const result = await services_db.admin_put_services_into_db({ id,
      title,
      description,
      ctaText,
      ctaLink,sectionHeader,
      image: new_file_path || findExistingDataById?.image,});

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Service is edited successfully.",
      data: result,
    });
  }
);

const admin_delete_services = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = services_db.admin_delete_services_into_db(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Services deleted successfully",
    data: result,
  });
});
const admin_get_services = catchAsync(async (req, res) => {
  const result = await services_db.admin_get_services_into_db(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Services get successfully",
    data: result,
  });
});

export const serviceController = {
  admin_post_Services,
  admin_put_Services,
  admin_delete_services,
  admin_get_services,
};
