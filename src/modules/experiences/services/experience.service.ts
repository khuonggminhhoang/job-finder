import { Inject, Injectable } from '@nestjs/common';
import { ExperienceEntity } from '../entities/experience.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class ExperienceService extends BaseCrudService<ExperienceEntity> {
  constructor(
    @InjectRepository(ExperienceEntity)
    private readonly experienceRepository: Repository<ExperienceEntity>,
    @Inject(REQUEST)
    private readonly req: Request,
  ) {
    super(ExperienceEntity, 'experiences', experienceRepository);
  }

  getUser() {
    return this.req.user as UserEntity;
  }

  protected async actionPreList(
    queryBuilder: SelectQueryBuilder<ExperienceEntity>,
    queryDto?: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<ExperienceEntity>> {
    const user = this.getUser();
    queryBuilder = queryBuilder.andWhere(`${this.alias}.userId = :userId`, {
      userId: user.id,
    });
    return super.actionPreList(queryBuilder, queryDto);
  }
}
