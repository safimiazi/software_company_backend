import { IServices } from "./home_services.interface";
import ServiceModel from "./home_services.model";

// home_services.service.ts - home_services module
const admin_post_services_into_db = async (data: Partial<IServices>) => {
  try {
    const result = await ServiceModel.create(data);

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Service create error: ${error.message}`);
    }else {
      throw new Error("Anknown error occurred.")
    }
  }
};
const admin_put_services_into_db = async (
  id: string,
  data: Partial<IServices>
) => {
  try {
    const result = await ServiceModel.findByIdAndUpdate(id, data, {
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

export const services_db = {
  admin_post_services_into_db,
  admin_put_services_into_db,
};
