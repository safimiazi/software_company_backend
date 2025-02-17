// case_study.controller.ts - case_study module
// project.controller.ts - project module
import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import path from "path";
import fs from "fs";
import { Case_study_services } from "./case_study.service";
import CaseStudyModel from "./case_study.model";
import { ICaseStudyRequestWithFile } from "./case_study.interface";

const post_case_study= catchAsync(async (req: ICaseStudyRequestWithFile, res) => {
  const filePath = req.file ? req.file.path : undefined;
console.log(req.body)
  const result = await Case_study_services.post_case_study_into_db({
    ...req.body,
    image: filePath,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Case study is saved successfully.",
    data: result,
  });
});
const put_case_study = catchAsync(async (req: ICaseStudyRequestWithFile, res) => {
  const new_file_path = req.file ? req.file.path : undefined;
  const { id } = req.params;

  // ID দিয়ে ডাটাবেজ থেকে ব্যানার খোঁজা
  const findExistingDataById = await CaseStudyModel.findOne({ _id: id });

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
  const result = await Case_study_services.put_case_study_into_db({
    id,
    ...req.body,
    image: new_file_path || findExistingDataById?.image,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Case study is edited successfully.",
    data: result,
  });
});

const delete_case_study = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = Case_study_services.delete_case_study_into_db(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Case study deleted successfully",
    data: result,
  });
});
const get_case_study = catchAsync(async (req, res) => {
  const result = await Case_study_services.get_case_study_into_db(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Case study get successfully",
    data: result,
  });
});

export const CaseStudyController = {
  post_case_study,
  put_case_study,
  delete_case_study,
  get_case_study,
};
