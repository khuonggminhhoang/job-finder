import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationController, NotificationPublicController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController, NotificationPublicController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
