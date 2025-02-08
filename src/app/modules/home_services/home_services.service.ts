import { IServices } from "./home_services.interface";
import ServiceModel from "./home_services.model";

// home_services.service.ts - home_services module
const admin_post_services_into_db = async ({
    title,
    description,
    heading,
    ctaText, ctaLink,
  }: Partial<IServices>) => {
      
    const result = await ServiceModel.create({
      title,
      description,
      ctaText, ctaLink,
      heading,
    });
  
    return result;
  };

  export const services_db = {
    admin_post_services_into_db
  }