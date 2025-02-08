import { IServices } from "./home_services.interface";
import ServiceModel from "./home_services.model";

// home_services.service.ts - home_services module
const admin_post_services_into_db = async (data: Partial<IServices>) => {
      
    const result = await ServiceModel.create(data);
  
    return result;
  };

  export const services_db = {
    admin_post_services_into_db
  }