/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { IHomeBanner } from "./home_banner.interface";
import HomeBannerModel from "./home_banner.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { home_banner_searchable_fields } from "./home_banner.constant";

// home_banner.service.ts - home_banner module
const admin_post_home_banner_into_db = async ({
  title,
  description,
  ctaText,
  ctaLink,
  filename,
}: Partial<IHomeBanner>) => {
  const result = await HomeBannerModel.create({
    title,
    description,
    ctaText,
    ctaLink,
    image: filename,
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

  const result = await home_banner_query.modelQuery;
  const meta = await home_banner_query.countTotal();
  return {
    result,
    meta,
  };
};
const get_home_banner_image_into_db = async (id: string) => {
  const result = await HomeBannerModel.findOne({ _id: id });
  const image = result?.image as string;
  const filePath = path.join(
    __dirname,
    "../../upload_files", // Adjust the path based on your project structure
    image
  );
  return filePath;
};
export const homeBannerServices = {
  admin_post_home_banner_into_db,
  get_home_banner_into_db,
  get_home_banner_image_into_db,
  admin_put_home_banner_into_db,
};
