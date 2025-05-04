import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { UserController } from '@/modules/users/controllers/user.controller';
import { UserService } from '@/modules/users/services/user.service';
import { ProfileUserController } from '@/modules/users/controllers/user-profile.controller';
import { S3Module } from '@/modules/providers/aws/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), S3Module],
  controllers: [UserController, ProfileUserController],
  providers: [UserService],
})
export class UserModule {}
