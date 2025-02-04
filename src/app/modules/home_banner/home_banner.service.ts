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

export const homeBannerServices = {
  admin_post_home_banner_into_db,
};
