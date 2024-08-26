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
    authSecret: process.env.TOKEN_SECRET_KEY || 'TOKEN_SECRET_KEY',
    AUTH_RESET_PASSWORD_SECRET:
      process.env.AUTH_RESET_PASSWORD_SECRET || 'AUTH_RESET_PASSWORD_SECRET',
    AUTH_REGISTER_SECRET: process.env.AUTH_REGISTER_SECRET || 'AUTH_REGISTER_SECRET',
  },
  authorizationIgnorePath: [
    '/',
    '/auth/verify-email',
    '/auth/change-password',
    '/auth/send-reset-password-email',
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
  authorizationIgnoreRegex: [
    /^\/product\/\d+$/,
    /^\/our-service\/\d+$/,
    /^\/cart\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  ],
};
