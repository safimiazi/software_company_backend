import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";

const registrationIntoDB = async (data: TAdmin) => {
  try {
    // Create a new admin document
    const admin = new adminModel(data);

    // Save to database
    const result = await admin.save();
    return result;
  } catch (error) {
    console.error("Error while saving admin:", error);
    throw new Error("Failed to register admin.");
  }
};

export const adminServices = {
  registrationIntoDB,
};
