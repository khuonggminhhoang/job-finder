import { Module } from '@nestjs/common';
import { UserSeed } from '@/migrations/seed/seeds/user.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { SeederService } from '@/migrations/seed/seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSeed, SeederService],
})
export class SeederModule {
  constructor(private readonly seeder: SeederService) {
    seeder
      .seed()
      .then((result) => result)
      .catch((e) => {
        throw e;
      });
  }
}
