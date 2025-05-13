import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import {
  NotificationController,
  NotificationPublicController,
} from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { FcmModule } from '@/modules/providers/firebase/fcm/fcm.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), FcmModule],
  controllers: [NotificationController, NotificationPublicController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
