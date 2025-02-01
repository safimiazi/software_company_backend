import jwt from "jsonwebtoken";

export const createToken = (
  newData: { id: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(newData, secret, { expiresIn: parseInt(expiresIn) });
};
