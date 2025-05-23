const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.prod' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_URL: process.env.REDIS_URL,
  NODE_ENV: env,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};
