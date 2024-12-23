export default () => ({
  port: Number(process.env.PORT) || 4000,
  hashSalt: Number(process.env.HASH_SALT) || 10,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.TOKEN_EXPIRE_IN,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
  jwtRefreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_IN,
});
