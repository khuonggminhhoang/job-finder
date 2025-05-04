import { Module } from '@nestjs/common';
import { UserSeed } from '@/migrations/seed/seeds/user.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { SeederService } from '@/migrations/seed/seeder.service';
import { CurrencyEntity } from '@/modules/currencies/entities/currency.entity';
import { ImageEntity } from '@/modules/images/entities/image.entity';
import { CurrencySeed } from '@/migrations/seed/seeds/currency.seed';
import { SupplierSeed } from '@/migrations/seed/seeds/supplier.seed';
import { SupplierEntity } from '@/modules/suppliers/entities/supplier.entity';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { CategorySeed } from '@/migrations/seed/seeds/category.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CurrencyEntity,
      ImageEntity,
      SupplierEntity,
      CategoryEntity,
    ]),
  ],
  providers: [
    UserSeed,
    SeederService,
    CurrencySeed,
    SupplierSeed,
    CategorySeed,
  ],
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
