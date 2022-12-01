const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    ROOT_PATH: Joi.string(),
    WRITE_PATH: Joi.string(),
    HTTP_PORT: Joi.number().default(3000),
    HTTPS_PORT: Joi.number().default(3001),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    //MONGODB_URL_MASTER : Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_DAYS: Joi.number()
      .default(92)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(182)
      .description("days after which refresh tokens expire"),
    RIPID_FOOTBALL_API_KEY: Joi.string()
      .required()
      .description("Ripid Football Api Key is required."),
    RIPDID_FOOTBALL_HOST: Joi.string()
      .required()
      .description("Ripid Football Api Host required"),
    RIPID_BASKETBALL_API_KEY: Joi.string()
      .required()
      .description("Ripid Basketball Api Key is required."),
    RIPDID_BASKETBALL_HOST: Joi.string()
      .required()
      .description("Ripid Basketball Api Host required"),
    TWITTER_API_BEARER_TOKEN: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  rootPath: envVars.ROOT_PATH,
  thumbPath: envVars.THUMB_PATH,
  writePath: envVars.WRITE_PATH,
  writePathReplication: envVars.WRITE_PATH_PATH_REPLICATION,
  httpPort: envVars.HTTP_PORT,
  httpsPort: envVars.HTTPS_PORT,
  download: envVars.IMAGE_DOWNLOAD_CRON,
  otherMachine: envVars.IMS_OTHER_MACHINE,
  subtratcTimeForUnlock: envVars.TIME_SUBTARCT_FOR_UNLOCK,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  ripidFootballApi: {
    key: envVars.RIPID_FOOTBALL_API_KEY,
    host: envVars.RIPDID_FOOTBALL_HOST,
  },
  ripidBasketballApi: {
    key: envVars.RIPID_BASKETBALL_API_KEY,
    host: envVars.RIPDID_BASKETBALL_HOST,
  },
  twitter: {
    bearerToken: envVars.TWITTER_API_BEARER_TOKEN,
  },
};
