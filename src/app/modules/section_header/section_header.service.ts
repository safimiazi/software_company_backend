/* eslint-disable @typescript-eslint/no-explicit-any */
// section_header.service.ts - section_header module
import status from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

import { ISectionHeader } from "./section_header.interface";
import SectionHeaderModel from "./section_header.model";
import { section_header_searchable_fields } from "./section_header.constant";

// home_services.service.ts - home_services module
const admin_post_section_header_into_db = async (
  data: Partial<ISectionHeader>
) => {
  try {
    const result = await SectionHeaderModel.create(data);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Service create error: ${error.message}`);
    } else {
      throw new Error("Anknown error occurred.");
    }
  }
};
const admin_put_section_header_into_db = async (data: any) => {
  try {
    const result = await SectionHeaderModel.updateOne({ _id: data.id }, data, {
      new: true,
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database Update Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

const admin_delete_section_header_into_db = async (id: string) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await SectionHeaderModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "Section header not found");
    }

    // Step 4: Delete the home banner from the database
    await SectionHeaderModel.deleteOne({ _id: id });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
const admin_get_section_header_into_db = async (
  query: Record<string, unknown>
) => {
  try {
    const service_query = new QueryBuilder(SectionHeaderModel.find(), query)
      .search(section_header_searchable_fields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await service_query.modelQuery;

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

export const section_services = {
  admin_delete_section_header_into_db,
  admin_get_section_header_into_db,
  admin_post_section_header_into_db,
  admin_put_section_header_into_db,
};
