import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategoryEntity } from './entities/job-category.entity';
import { JobCategoryService } from './services/job-category.service';
import { JobCategoryController } from './controllers/job-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobCategoryEntity])],
  controllers: [JobCategoryController],
  providers: [JobCategoryService],
  exports: [JobCategoryService],
})
export class JobCategoryModule {}
