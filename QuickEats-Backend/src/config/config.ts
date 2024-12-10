import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGO_URL,
  saltWorkFactor: 10,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  secure: process.env.ENV_NODE === "development" ? false : true,
  jwtTokenAge: 24*60*60*1000,
  verificationTokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  passwordResetTokenTokenExpiry: 1 * 60 * 60 * 1000, // 1 hour
  corsOrigin: process.env.CLIENT_URL,
  // mailtrap
  mailtrapApiToken: process.env.MAILTRAP_API_TOKEN,
  // cloudinary
  clientUrl: process.env.CLIENT_URL,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySeceret: process.env.CLOUDINARY_SECRET_KEY, 
  // stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  // resend
  resendApiKey: process.env.RESEND_API_KEY

}

export default config;
