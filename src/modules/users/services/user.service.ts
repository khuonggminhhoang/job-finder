/*eslint-disable @typescript-eslint/no-unused-expressions*/
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateProfileUserDto } from '@/modules/users/dtos/user.dto';
import { CommonAwsS3Service } from '@/modules/providers/aws/s3/aws-s3.service';
import { config } from '@/config/config.service';
import * as _ from 'lodash';

@Injectable()
export class UserService extends BaseCrudService<UserEntity> {
  constructor(
    @Inject(REQUEST)
    private readonly req: Request,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly s3Service: CommonAwsS3Service,
  ) {
    super(UserEntity, 'users', userRepository);
  }

  getUser() {
    return this.req.user as UserEntity;
  }

  async updateOne(id: number, dto: UpdateProfileUserDto) {
    const record = (await this.getOne({
      where: { id },
      relations: ['image'],
    })) as UserEntity;
    // if (dto.photoFile) {
    //   record.image.url = dto.photoFile;
    //   delete record.imageId;
    // } else {
    //   delete record.image;
    // }
    _.assign(
      record,
      _.pickBy(dto, (v) => v !== undefined),
    );
    return record.save();
  }

  async updateProfile(dto: UpdateProfileUserDto, file?: Express.Multer.File) {
    const userId = this.getUser().id;
    if (file) {
      const resultUpload = await this.s3Service.uploadByMulter(
        file,
        config.S3.PATH_IMG.user(userId),
      );
      dto.photoFile = resultUpload.uploadFile.path as string;
    }
    return this.updateOne(userId, dto);
  }
}
