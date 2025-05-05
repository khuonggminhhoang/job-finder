import { Injectable } from '@nestjs/common';
import { UserSeed } from '@/migrations/seed/seeds/user.seed';

@Injectable()
export class SeederService {
  constructor(private readonly userSeed: UserSeed) {}

  public async seed() {
    await this.userSeed.seed();
  }
}
