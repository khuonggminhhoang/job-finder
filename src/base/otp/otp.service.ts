import { Injectable } from '@nestjs/common';
import { totp } from 'otplib';
import { config } from '@/config/config.service';

@Injectable()
export class OtpService {
  generateOTP(secretKey: string): string {
    const options = {
      ...config.OTP_OPTION,
      epoch: Date.now(), // time start otp
    };
    totp.options = options;
    const secret = config.OTP_SECRET + secretKey;
    return totp.generate(secret);
  }

  verifyOTP(otp: string, secretKey: string): boolean {
    const options = {
      ...config.OTP_OPTION,
      epoch: Date.now(),
    };
    totp.options = options;
    const secret = config.OTP_SECRET + secretKey;
    return totp.verify({ token: otp, secret: secret });
  }
}
