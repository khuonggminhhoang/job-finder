import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { RegisterAuthDto } from '@/modules/users/dtos/user.dto';
import * as exc from '@/base/exceptions';
import { BadRequestException } from '@/base/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly repository: Repository<UserEntity>,
  ) {}

  async getUser(
    option: Partial<UserEntity> | ObjectLiteral[],
  ): Promise<UserEntity> {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.currency', 'currencies')
      .leftJoinAndSelect('user.image', 'images')
      .where(option)
      .getOne();
  }

  async getUserOrThrow(option: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.getUser(option);
    if (!user)
      throw new exc.NotFoundException({
        error: 'AUTH.USER_NOT_FOUND',
        message: 'User not found',
      });
    return user;
  }

  async createUser(registerDto: RegisterAuthDto) {
    const existMailUser = await this.getUser({ email: registerDto.email });
    if (existMailUser)
      throw new BadRequestException({ message: 'Email is existed' });
    const existUsernameUser = await this.getUser({
      username: registerDto.username,
    });
    if (existUsernameUser)
      throw new BadRequestException({ message: 'Username is existed' });
    const user = this.repository.create({ ...registerDto });
    user.setPassword(registerDto.password);
    return user.save();
  }
}
