import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { UserController } from '@/modules/users/controllers/user.controller';
import { UserService } from '@/modules/users/services/user.service';
import { ProfileUserController } from '@/modules/users/controllers/user-profile.controller';
import { S3Module } from '@/modules/providers/aws/s3/s3.module';
import { JobEntity } from '@/modules/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, JobEntity]), S3Module],
  controllers: [UserController, ProfileUserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
