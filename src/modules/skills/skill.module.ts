import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { SkillController } from './controllers/skill.controller';
import { SkillService } from './services/skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
