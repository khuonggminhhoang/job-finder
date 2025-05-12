import {
  Body,
  Controller, Delete,
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
import { FileBodyDto } from '@/base/api/dtos/common.dto';

@ApiBearerAndTags('Profile user')
@Controller('profile')
export class ProfileUserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: 'lấy thông tin profile cá nhân' })
  getMe(@UserAuth('id') userId: number) {
    return this.userService.getOne({
      where: { id: userId },
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

  @Post('me/portfolio')
  @ApiOperation({ summary: 'upload portfolio cá nhân' })
  @UseFilters(MulterErrorFilter)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updatePortfolio(
    @Body() dto: FileBodyDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userService.updatePortfolio(dto, file);
  }

  @Delete('me/portfolio')
  @ApiOperation({ summary: 'xóa portfolio' })
  deletePortfolio() {
    return this.userService.deletePortfolio();
  }
}
