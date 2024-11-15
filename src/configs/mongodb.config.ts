import { log } from "console";

const dev = {
  app: {
    port: Number(process.env.DEV_APP_PORT) || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: Number(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

const prod = {
  app: {
    port: Number(process.env.PROD_APP_PORT) || 3000,
  },
  db: {
    host: process.env.PROD_DB_HOST || "localhost",
    port: Number(process.env.PROD_DB_PORT) || 27017,
    name: process.env.PROD_DB_NAME || "shopProd",
  },
};

const config: any = { dev, prod };
const env = process.env.NODE_ENV || "dev";

log(`Your environment is: ${env}`);
log(`Your port is: ${config[env].app.port}`);
export default config[env];
