import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT: Number(process.env.SALT_ROUND),
  node_env: process.env.NODE_ENV,
  access_token: process.env.ACCESS_TOKEN
};
