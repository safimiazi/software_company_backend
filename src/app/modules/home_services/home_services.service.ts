/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { IServices } from "./home_services.interface";
import ServiceModel from "./home_services.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { services_searchable_fields } from "./home_services.constant";
import { formatResultImage } from "../../utils/formatImage";
import path from "path";
import fs from "fs";

// home_services.service.ts - home_services module
const admin_post_services_into_db = async (data: Partial<IServices>) => {
  try {
    const result = await ServiceModel.create(data);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Service create error: ${error.message}`);
    } else {
      throw new Error("Anknown error occurred.");
    }
  }
};
const admin_put_services_into_db = async (data: any) => {
  try {
    const result = await ServiceModel.updateOne({_id:data.id}, data, {
      new: true,
    });
    if (!result) {
      throw new Error("Service not found.");
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

const admin_delete_services_into_db = async (id: string) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await ServiceModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "Services not found");
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
    await ServiceModel.deleteOne({ _id: id });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
const admin_get_services_into_db = async (query: Record<string, unknown>) => {
  try {
    const service_query = new QueryBuilder(ServiceModel.find(), query)
      .search(services_searchable_fields)
      .filter()
      .sort()
      .paginate()
      .fields();

    let result: any = await service_query.modelQuery.populate("sectionHeader");
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
  admin_post_services_into_db,
  admin_put_services_into_db,
  admin_delete_services_into_db,
  admin_get_services_into_db,
};
