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
import { JobEntity } from '@/modules/jobs/entities/job.entity';
import { FileBodyDto } from '@/base/api/dtos/common.dto';

@Injectable()
export class UserService extends BaseCrudService<UserEntity> {
  constructor(
    @Inject(REQUEST)
    private readonly req: Request,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
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
    })) as UserEntity;
    if (dto.photoFile) {
      record.avatar = dto.photoFile;
    }
    if (dto.file) {
      record.portfolio = dto.file;
    }
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
        config.S3.PATH.user(userId),
      );
      dto.photoFile = resultUpload.uploadFile.path as string;
    }
    return this.updateOne(userId, dto);
  }

  async updatePortfolio(dto: FileBodyDto, file?: Express.Multer.File) {
    const userId = this.getUser().id;
    if (file) {
      const resultUpload = await this.s3Service.uploadByMulter(
        file,
        config.S3.PATH.user(userId),
      );
      dto.file = resultUpload.uploadFile.path as string;
    }
    return this.updateOne(userId, dto);
  }

  async deletePortfolio() {
    const user = this.getUser();
    if (user.portfolio) {
      user.portfolio = null;
    }
    return user.save();
  }

  async likeJob(userId: number, jobId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const job = await this.jobRepository.findOne({ where: { id: jobId } });

    if (!user || !job) {
      throw new Error('User or job not found');
    }

    user.jobs = [...(user.jobs || []), job];
    return await this.userRepository.save(user);
  }

  async unlikeJob(userId: number, jobId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['jobs'],
    });
    const job = await this.jobRepository.findOne({ where: { id: jobId } });

    if (!user || !job) {
      throw new Error('User or job not found');
    }

    user.jobs = user.jobs.filter((savedJob) => savedJob.id !== jobId);
    await this.userRepository.save(user);
  }

  async getSavedJobs(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['jobs', 'jobs.company', 'jobs.category'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.jobs;
  }
}
