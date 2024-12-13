import { 
  generatePasswordResetEmailHtml, 
  generateResetSuccessEmailHtml, 
  generateWelcomeEmailHtml, 
  htmlContent 
} from "./htmlForEmail.js";
import { client, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  const recipient = [{ email }];
    try {
      const res = await client.send({
        from: sender,
        to: recipient,
        subject: 'Verify your email',
        html:htmlContent.replace("{verificationToken}", verificationCode),
        category: 'Email Verification'
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send email verification")
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'Welcome to QuicklyEat',
      html:htmlContent,
      template_variables:{
        company_info_name:"QuicklyEat",
        name:name
      }});
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send welcome email")
    }
}
export const sendPasswordResetEmail = async (email:string, resetURL:string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL, name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'Reset your password',
      html:htmlContent,
      category:"Reset Password"
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset password")
  }
}
export const sendResetSuccessEmail = async (email:string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Successfully',
      html:htmlContent,
      category:"Password Reset"
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send password reset success email");
  }
}