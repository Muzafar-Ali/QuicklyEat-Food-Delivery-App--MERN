import {MailtrapClient} from "mailtrap";
import config from "../config/config.js";
console.log('config.mailtrapApiToken', config.mailtrapApiToken)
export const client = new MailtrapClient({token: config.mailtrapApiToken! });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "QuicklyEat Team",
};