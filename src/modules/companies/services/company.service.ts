import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';

@Injectable()
export class CompanyService extends BaseCrudService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {
    super(CompanyEntity, 'companies', companyRepository);
  }
}
