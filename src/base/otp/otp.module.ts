import { Module } from '@nestjs/common';
import { OtpService } from '@/base/otp/otp.service';

@Module({
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
