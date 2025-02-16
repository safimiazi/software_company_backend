// project.service.ts - project module
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { formatResultImage } from "../../utils/formatImage";
import path from "path";
import fs from "fs";
import { IProject } from "./project.interface";
import ProjectModel from "./project.model";
import { project_searchable_fields } from "./project.constant";

const post_project_into_db = async (data: Partial<IProject>) => {
  try {

    const result = await ProjectModel.create(data);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Service create error: ${error.message}`);
    } else {
      throw new Error("Anknown error occurred.");
    }
  }
};
const put_project_into_db = async (data: any) => {
  try {
    const result = await ProjectModel.updateOne({_id:data.id}, data, {
      new: true,
    });
    if (!result) {
      throw new Error("Project not found.");
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

const delete_project_into_db = async (id: string) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await ProjectModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "project not found");
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
    await ProjectModel.deleteOne({ _id: id });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
const get_project_into_db = async (query: Record<string, unknown>) => {
  try {
    const service_query = new QueryBuilder(ProjectModel.find(), query)
      .search(project_searchable_fields)
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

export const services_db = {
  post_project_into_db,
  put_project_into_db,
  delete_project_into_db,
  get_project_into_db
};
