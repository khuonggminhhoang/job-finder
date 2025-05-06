import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'website', nullable: true })
  website: string;

  @Column({ name: 'industry', nullable: true })
  industry: string;

  @Column({ name: 'company_size', nullable: true })
  companySize: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address: string;

  @Column({ name: 'is_top_company', type: 'boolean', default: false })
  isTopCompany: boolean;
}
