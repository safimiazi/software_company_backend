// case_study.service.ts - case_study module
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { formatResultImage } from "../../utils/formatImage";
import path from "path";
import fs from "fs";
import { ICaseStudy } from "./case_study.interface";
import CaseStudyModel from "./case_study.model";
import { case_study_searchable_fields } from "./case_study.constant";

const post_case_study_into_db = async (data: Partial<ICaseStudy>) => {
  try {

    const result = await CaseStudyModel.create(data);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(` create error: ${error.message}`);
    } else {
      throw new Error("Anknown error occurred.");
    }
  }
};
const put_case_study_into_db = async (data: any) => {
  try {
    const result = await CaseStudyModel.updateOne({_id:data.id}, data, {
      new: true,
    });
    if (!result) {
      throw new Error("Case study not found.");
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database Update Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

const delete_case_study_into_db = async (id: string) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await CaseStudyModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "Case study not found");
    }


    // Step 2: Get the image file name
    const file_name = isExist?.image
      ? isExist.image.match(/[^\\]+$/)?.[0]
      : undefined;
    const filePath = file_name
      ? path.join(__dirname, "../../../../uploads", file_name)
      : null;

    // Step 3: Delete the file from the server (if it exists)
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Step 4: Delete the home banner from the database
    await CaseStudyModel.deleteOne({ _id: id });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
const get_case_study_into_db = async (query: Record<string, unknown>) => {
  try {
    const service_query = new QueryBuilder(CaseStudyModel.find(), query)
      .search(case_study_searchable_fields)
      .filter()
      .sort()
      .paginate()
      .fields();

    let result: any = await service_query.modelQuery;
    result = formatResultImage(result, "image");

    const meta = await service_query.countTotal();
    return {
      result,
      meta,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

export const Case_study_services = {
  post_case_study_into_db,
  put_case_study_into_db,
  delete_case_study_into_db,
  get_case_study_into_db
};
