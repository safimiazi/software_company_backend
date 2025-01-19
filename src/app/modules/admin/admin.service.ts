import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";

const createAdminIntoDB = async (admin : TAdmin) =>{

    
    const result = await adminModel.create(admin);
    return result;


}

export const adminServices = {
    createAdminIntoDB
}