// project.controller.ts - project module
import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import path from "path";
import fs from "fs";
import { IProjectRequestWithFile } from "./project.interface";
import { Project_services } from "./project.service";
import ProjectModel from "./project.model";

const post_project = catchAsync(async (req: IProjectRequestWithFile, res) => {
  const filePath = req.file ? req.file.path : undefined;

  const result = await Project_services.post_project_into_db({
    ...req.body,
    image: filePath,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project is saved successfully.",
    data: result,
  });
});
const put_project = catchAsync(async (req: IProjectRequestWithFile, res) => {
  const new_file_path = req.file ? req.file.path : undefined;
  const { id } = req.params;

  // ID দিয়ে ডাটাবেজ থেকে ব্যানার খোঁজা
  const findExistingDataById = await ProjectModel.findOne({ _id: id });

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
  const result = await Project_services.put_project_into_db({
    id,
    ...req.body,
    image: new_file_path || findExistingDataById?.image,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project is edited successfully.",
    data: result,
  });
});

const delete_project = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = Project_services.delete_project_into_db(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});
const get_project = catchAsync(async (req, res) => {
  const result = await Project_services.get_project_into_db(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project get successfully",
    data: result,
  });
});

export const projectController = {
  post_project,
  put_project,
  delete_project,
  get_project,
};
