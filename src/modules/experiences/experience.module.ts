import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from './entities/experience.entity';
import { ExperienceController } from './controllers/experience.controller';
import { ExperienceService } from './services/experience.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {} 