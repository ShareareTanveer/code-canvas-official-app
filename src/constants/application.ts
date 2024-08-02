const basePath = '/';

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: '1d',
    resetPasswordCookieExpiry: '15m',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
    AUTH_RESET_PASSWORD_SECRET: process.env.AUTH_RESET_PASSWORD_SECRET || 'test',
    AUTH_REGISTER_SECRET: process.env.AUTH_REGISTER_SECRET || 'test',
  },
  authorizationIgnorePath: [
    '/',
    '/auth/send-email-otp',
    '/auth/verify-email-otp',
    '/auth/verify-email',
    '/auth/change-password',
    '/auth/register',
    '/auth/login',
    '/core/main-website-page',
    '/core/generic-page-section',
    '/core/generic-page-section-item',
    '/core/contact-us',
    '/core/office-info',
    '/cart',
    '/category',
    '/tag',
    '/product',
    '/our-service',
  ],
};
