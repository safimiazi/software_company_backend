// home_about.service.ts - home_about module
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import status from "http-status";
import fs from "fs";
import HomeAboutModel from "./home_about.model";
import { home_about_searchable_fields } from "./home_about.constant";
import { IHomeAbout } from "./home_about.interface";
import { formatResultImage } from "../../utils/formatImage";

// home_banner.service.ts - home_banner module
const admin_post_home_about_into_db = async ({
  title,
  description,
  heading,
  ctaText,
  ctaLink,
  filename,
}: Partial<IHomeAbout>) => {
  const isExist = await HomeAboutModel.find();
  console.log(isExist);
  if (isExist.length > 0) {
    throw new Error("About already exist, you can not create more than one");
  }

  const result = await HomeAboutModel.create({
    title,
    description,
    ctaText,
    ctaLink,
    heading,
    image: filename,
  });

  return result;
};
const admin_put_home_about_into_db = async ({
  id,
  title,
  description,
  ctaText,
  ctaLink,
  heading,
  filename,
}: any) => {
  const result = await HomeAboutModel.updateOne(
    { _id: id },
    {
      title,
      description,
      heading,
      ctaText,
      ctaLink,
      image: filename,
    }
  );

  return result;
};

const get_home_about_into_db = async (query: Record<string, unknown>) => {
  const home_about_query = new QueryBuilder(HomeAboutModel.find(), query)
    .search(home_about_searchable_fields)
    .filter()
    .sort()
    .paginate()
    .fields();

  let result: any = await home_about_query.modelQuery;
  result = formatResultImage(result, "image");
  const meta = await home_about_query.countTotal();
  return {
    result,
    meta,
  };
};

const home_about_data_delete_db = async (id: string) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await HomeAboutModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "Home about not found");
    }

    // Step 2: Get the image file name
    const file_name = isExist.image;
    const filePath = file_name
      ? path.join(__dirname, "../../upload_files", file_name)
      : null;

    // Step 3: Delete the file from the server (if it exists)
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Step 4: Delete the home banner from the database
    await HomeAboutModel.deleteOne({ _id: id });
    return;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const homeAboutServices = {
  admin_post_home_about_into_db,
  get_home_about_into_db,
  admin_put_home_about_into_db,
  home_about_data_delete_db,
};
