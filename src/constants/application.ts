const basePath = '/';

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: '1d',
    resetPasswordCookieExpiry: '5m',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
    AUTH_PASSWORD_SECRET: process.env.AUTH_PASSWORD_SECRET || 'test',
  },
  authorizationIgnorePath: [
    '/',
    '/auth/send-email-otp',
    '/auth/verify-email-otp',
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
