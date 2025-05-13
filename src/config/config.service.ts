import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

const env = Object.assign({}, process.env);

@Injectable()
export class ConfigService {
  PORT = +(env.PORT ?? 3001);

  DB_HOST: string = env.DB_HOST ?? 'localhost';
  DB_PORT = +(env.DB_PORT ?? 3306);
  DB_USER = env.DB_USERNAME ?? 'root';
  DB_PASSWORD = env.DB_PASSWORD ?? '';
  DB_DATABASE = env.DB_DATABASE ?? 'job_finder';

  FE_URL = env.FE_URL ?? 'http://localhost:3000';
  PREFIX = 'api/v1';
  TOKEN_EXP = +(env.TOKEN_EXP ?? '15');

  SWAGGER = {
    TITLE: 'Job Finder API Docs',
    VERSION: 'v1.0.0',
    DESCRIPTION: 'Description document for Rest API',
    CONTACT: {
      NAME: 'Back End Developer',
      URL: 'https://www.facebook.com/khuongminhminh.hoang/',
      EMAIL: 'minhkhuong782k3@gmail.com',
    },
    CUSTOM: {
      SITE_TITLE: 'API docs Job Finder',
    },
  };

  PASSWORD_SALT = +(env.PASSWORD_SALT ?? '10');

  // JWT
  REFRESH_TOKEN_SECRET = env.REFRESH_SECRET ?? 'refresh-secret-key';
  REFRESH_TOKEN_EXP = env.REFRESH_EXP ?? '30d';
  ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET ?? 'access-secret-key';
  ACCESS_TOKEN_EXP = env.ACCESS_TOKEN_EXP ?? '7d';

  // OTP
  OTP_SECRET = env.OTP_SECRET ?? 'otp-secret-key';
  OTP_OPTION = {
    digits: 4,
    step: 60 * 10,
    window: 1,
  };

  // MAIL
  EMAIL_FROM_ADDRESS = env.EMAIL_FROM_ADDRESS ?? 'no-reply@gmail.com';
  EMAIL_USER = env.EMAIL_USER ?? '';
  EMAIL_PASSWORD = env.EMAIL_PASSWORD ?? '';
  EMAIL_USE_TLS = (env.EMAIL_USE_TLS ?? 'true').toLowerCase() === 'true';
  EMAIL_HOST = env.EMAIL_HOST ?? 'smtp.gmail.com';
  EMAIL_PORT = +(env.EMAIL_PORT ?? '587');

  GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID ?? '';
  PAGINATION_PAGE_SIZE = 20;
  UPLOAD_LIMIT = +env.UPLOAD_LIMIT || 5 * 1024 * 1024; // 5MB

  //AWS
  S3 = {
    S3_ACCESS_KEY_ID: env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET: env.S3_BUCKET,
    S3_REGION: env.S3_REGION,
    PATH: {
      user: (userId: number) => ['img', 'user', userId],
      uploadCV: (userId: number) => ['CV', userId],
      // category: () => ['img', 'category'],
      // country: () => ['img', 'country'],
      // bank: () => ['img', 'bank'],
    },
  };

  // Firebase
  FCM = {
    type: env.FIREBASE_TYPE,
    projectId: env.FIREBASE_PROJECT_ID,
    privateKeyId: env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: env.FIREBASE_PRIVATE_KEY,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    clientId: env.FIREBASE_CLIENT_ID,
    authUri: env.FIREBASE_AUTH_URI,
    tokenUri: env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: env.FIREBASE_CLIENT_X509_CERT_URL,
    universeDomain: env.FIREBASE_UNIVERSE_DOMAIN,
  };
}

export const config = new ConfigService();
