import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@/modules/users/services/user.service';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UserAuth } from '@/modules/auth/common/jwt.decorator';
import { MulterErrorFilter } from '@/base/util/multer.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileUserDto } from '@/modules/users/dtos/user.dto';

@ApiBearerAndTags('Profile user')
@Controller('profile')
export class ProfileUserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: 'lấy thông tin profile cá nhân' })
  getMe(@UserAuth('id') userId: number) {
    return this.userService.getOne({
      where: { id: userId },
      relations: ['currency', 'image', 'currency.image'],
    });
  }

  @Post('/me')
  @ApiOperation({ summary: 'sửa profile cá nhân' })
  @UseFilters(MulterErrorFilter)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photoFile'))
  updateMe(
    @Body() dto: UpdateProfileUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userService.updateProfile(dto, file);
  }
}
