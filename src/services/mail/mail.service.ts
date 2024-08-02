import path from 'path';
import MailerService from '../mailer/mailer.service';
import { MailData } from 'mail-data.interface';
import { authMailMessage } from './messages/auth.messages';

const mailerService = new MailerService();

async function sendMail({
  to,
  subject,
  text,
  templatePath,
  context
}: {
  to: string;
  subject: string;
  text: string;
  templatePath: string;
  context: Record<string, unknown>;
}) {
  await mailerService.sendMail({
    to,
    subject,
    text,
    templatePath,
    context,
  });
}

async function twoFactorAuth(mailData: MailData<{ hash: string }>): Promise<void> {
  const url = new URL(`${process.env.BASE_APP_URL}/two-factor-auth`);
  url.searchParams.set('hash', mailData.data.hash);

  await sendMail({
    to: mailData.to,
    subject: authMailMessage.twoFactorAuth.title,
    text: `${url.toString()} ${authMailMessage.twoFactorAuth.title}`,
    templatePath: path.join(__dirname, '../mail/mail-templates/two-factor-auth.hbs'),
    context: {
      title: authMailMessage.twoFactorAuth.title,
      url: url.toString(),
      actionTitle: authMailMessage.twoFactorAuth.title,
      text1: authMailMessage.twoFactorAuth.text1,
      text2: authMailMessage.twoFactorAuth.text2,
      text3: authMailMessage.twoFactorAuth.text3,
    },
  });
}

async function userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
  try {
    const url = new URL(`${process.env.BASE_APP_URL}/authentication`);
    url.searchParams.set('hash', mailData.data.hash);
  
    await sendMail({
      to: mailData.to,
      subject: authMailMessage.userSignUp.title,
      text: `${url.toString()} ${authMailMessage.userSignUp.title}`,
      templatePath: path.join(__dirname, '../mailer/mailTemplates/activation.hbs'),
      context: {
        title: authMailMessage.userSignUp.title,
        url: url.toString(),
        actionTitle: authMailMessage.userSignUp.title,
        text1: authMailMessage.userSignUp.text1,
        text2: authMailMessage.userSignUp.text2,
        text3: authMailMessage.userSignUp.text3,
      },
    });
  } catch (error) {
    return;
  }
}

async function forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
  const url = new URL(`${process.env.BASE_APP_URL}/authentication/change-password`);
  url.searchParams.set('hash', mailData.data.hash);

  await sendMail({
    to: mailData.to,
    subject: authMailMessage.forgotPassword.title,
    text: `${url.toString()} ${authMailMessage.forgotPassword.title}`,
    templatePath: path.join(__dirname, '../mailer/mailTemplates/reset-password.hbs'),
    context: {
      title: authMailMessage.forgotPassword.title,
      url: url.toString(),
      actionTitle: authMailMessage.forgotPassword.title,
      app_name: process.env.APP_NAME,
      text1: authMailMessage.forgotPassword.text1,
      text2: authMailMessage.forgotPassword.text2,
      text3: authMailMessage.forgotPassword.text3,
      text4: authMailMessage.forgotPassword.text4,
    },
  });
}

async function confirmNewEmail(mailData: MailData<{ hash: string }>): Promise<void> {
  const url = new URL(`${process.env.BASE_APP_URL}/confirm-new-email`);
  url.searchParams.set('hash', mailData.data.hash);

  await sendMail({
    to: mailData.to,
    subject: authMailMessage.confirmNewEmail.title,
    text: `${url.toString()} ${authMailMessage.confirmNewEmail.title}`,
    templatePath: path.join(__dirname, '../mail/mail-templates/confirm-new-email.hbs'),
    context: {
      title: authMailMessage.confirmNewEmail.title,
      url: url.toString(),
      actionTitle: authMailMessage.confirmNewEmail.title,
      app_name: process.env.APP_NAME,
      text1: authMailMessage.confirmNewEmail.text1,
      text2: authMailMessage.confirmNewEmail.text2,
      text3: authMailMessage.confirmNewEmail.text3,
    },
  });
}

export {
  twoFactorAuth,
  userSignUp,
  forgotPassword,
  confirmNewEmail,
};
