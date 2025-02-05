import path from "path";
import { IHomeBanner } from "./home_banner.interface";
import HomeBannerModel from "./home_banner.model";

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

const get_home_banner_into_db = async () => {
  const result = await HomeBannerModel.find().sort({ createdAt: -1 });
  return result;
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
};
