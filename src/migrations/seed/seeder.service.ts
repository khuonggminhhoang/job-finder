import { Injectable } from '@nestjs/common';
import { UserSeed } from '@/migrations/seed/seeds/user.seed';
import { CurrencySeed } from '@/migrations/seed/seeds/currency.seed';
import { SupplierSeed } from '@/migrations/seed/seeds/supplier.seed';
import { CategorySeed } from '@/migrations/seed/seeds/category.seed';

@Injectable()
export class SeederService {
  constructor(
    private readonly userSeed: UserSeed,
    private readonly currencySeed: CurrencySeed,
    private readonly supplierSeed: SupplierSeed,
    private readonly categorySeed: CategorySeed,
  ) {}

  public async seed() {
    await this.userSeed.seed();
    await this.currencySeed.seed();
    await this.supplierSeed.seed();
    await this.categorySeed.seed();
  }
}
