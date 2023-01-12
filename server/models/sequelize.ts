import { Sequelize } from "sequelize";
import config from "../config/config";

/* Env type annotation */
const env =
  (process.env.NODE_ENV as "production" | "test" | "development") ||
  "development";

/* DB connect information */
const { database, username, password } = config[env];
const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;
