import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

const data = {
  id: 1,
  firstName: 'Khuong',
  lastName: 'Hoang Minh',
  dob: '2003/08/07',
  phoneNumber: '0377476212',
  email: 'minhkhuong782k3@gmail.com',
  username: 'khuong.hm',
  password: '$2b$10$2c7IAvHGkFrUn2.HHDcfY.ZhInGIO8tv9g.hwTQor1as7vOJaqUDy', // 123123
  createdAt: new Date(),
};

@Injectable()
export class UserSeed {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed() {
    const count = await this.userRepository.count();
    if (count) return;
    return this.userRepository.save(data);
  }
}
