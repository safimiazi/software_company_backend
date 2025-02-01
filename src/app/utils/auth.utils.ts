import config from "../config";

export const createToken = (newData: {id: string, role: string}, )=> {
    const access_token = jwt.sign(newData, (config.access_token as string), { expiresIn: '1h' });

}