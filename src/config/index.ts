import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  production: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT as string, 10),
  healthPort: process.env.HEALTH_PORT === undefined ? 5678 : parseInt(process.env.HEALTH_PORT, 10),
  swaggerBaseUrl: process.env.SWAGGER_BASE_URL,
  auth: {
    token: process.env.TOKEN
  }
};
