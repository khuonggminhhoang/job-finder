import { Module } from '@nestjs/common';
import { CommonAwsS3Service } from '@/modules/providers/aws/s3/aws-s3.service';

@Module({
  providers: [CommonAwsS3Service],
  exports: [CommonAwsS3Service],
})
export class S3Module {}
