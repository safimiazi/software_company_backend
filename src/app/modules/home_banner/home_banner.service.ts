/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { IHomeBanner } from "./home_banner.interface";
import HomeBannerModel from "./home_banner.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { home_banner_searchable_fields } from "./home_banner.constant";
import AppError from "../../errors/AppError";
import status from "http-status";
import fs from "fs";
import { formatResultImage } from "../../utils/formatImage";

// home_banner.service.ts - home_banner module
const admin_post_home_banner_into_db = async ({
  title,
  description,
  ctaText,
  ctaLink,
  image,
}: Partial<IHomeBanner>) => {
  const result = await HomeBannerModel.create({
    title,
    description,
    ctaText,
    ctaLink,
    image,
  });

  return result;
};
const admin_put_home_banner_into_db = async ({
  id,
  title,
  description,
  ctaText,
  ctaLink,
  filename,
}: any) => {
  const result = await HomeBannerModel.updateOne(
    { _id: id },
    {
      title,
      description,
      ctaText,
      ctaLink,
      image: filename,
    }
  );

  return result;
};

const get_home_banner_into_db = async (query: Record<string, unknown>) => {
  const home_banner_query = new QueryBuilder(HomeBannerModel.find(), query)
    .search(home_banner_searchable_fields)
    .filter()
    .sort()
    .paginate()
    .fields();

  let result: any = await home_banner_query.modelQuery;
  result = formatResultImage(result, "image");
  const meta = await home_banner_query.countTotal();
  return {
    result,
    meta,
  };
};

const home_banner_data_delete_db = async (id: string) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await HomeBannerModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "Home banner not found");
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
    await HomeBannerModel.deleteOne({ _id: id });
    return;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const homeBannerServices = {
  admin_post_home_banner_into_db,
  get_home_banner_into_db,
  admin_put_home_banner_into_db,
  home_banner_data_delete_db,
};
