import { Controller } from '@nestjs/common';
import { UserService } from '@/modules/users/services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
