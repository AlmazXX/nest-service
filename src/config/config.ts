export default () => ({
  port: Number(process.env.PORT) || 4000,
  hashSalt: Number(process.env.HASH_SALT) || 10,
  jwtSecret: process.env.JWT_SECRET,
});
