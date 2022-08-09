export const config = {
  token: {
    expireTime: process.env.SERVER_TOKEN_EXPIRETIME,
    issuer: process.env.SERVER_TOKEN_ISSUER,
    secret: process.env.SERVER_TOKEN_SECRET || 'abc12345',
  },
};
