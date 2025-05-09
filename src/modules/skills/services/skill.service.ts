import { Inject, Injectable } from '@nestjs/common';
import { SkillEntity } from '../entities/skill.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class SkillService extends BaseCrudService<SkillEntity> {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
    @Inject(REQUEST)
    private readonly req: Request,
  ) {
    super(SkillEntity, 'skills', skillRepository);
  }

  getUser() {
    return this.req.user as UserEntity;
  }

  protected async actionPreList(
    queryBuilder: SelectQueryBuilder<SkillEntity>,
    queryDto?: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<SkillEntity>> {
    const user = this.getUser();
    queryBuilder = queryBuilder.andWhere(`${this.alias}.userId = :userId`, {
      userId: user.id,
    });
    return super.actionPreList(queryBuilder, queryDto);
  }
}
