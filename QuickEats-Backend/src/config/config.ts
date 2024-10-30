import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGO_URL,
  saltWorkFactor: 10,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  secure: process.env.NODE_ENV === "development" ? false : true,
  jwtTokenAge: 24*60*60*1000,
  verificationTokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  passwordResetTokenTokenExpiry: 1 * 60 * 60 * 1000, // 1 hour
  mailtrapApiToken: process.env.MAILTRAP_API_TOKEN,
  // cloudinary
  clientUrl: process.env.CLIENT_URL,
  cloudinaryCloudName: process.env.CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySeceret: process.env.CLOUDINARY_SECRET_KEY, 
  // stripe
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,

}

export default config;
