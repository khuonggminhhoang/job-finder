import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { ApplicationService } from './services/application.service';
import { ApplicationController } from './controllers/application.controller';
import { S3Module } from '@/modules/providers/aws/s3/s3.module';
import { MulterModule } from '@nestjs/platform-express';
import {
  fileFilter,
  multerConfig,
  UPLOAD_PDF_EXTNAME,
} from '@/base/util/multer.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
    S3Module,
    MulterModule.register(
      multerConfig({
        storage: undefined,
        fileFilter: fileFilter(UPLOAD_PDF_EXTNAME),
        limits: {
          fileSize: 10 * 1024 * 1024, // Tăng giới hạn lên 10MB cho PDF
        },
      }),
    ),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
