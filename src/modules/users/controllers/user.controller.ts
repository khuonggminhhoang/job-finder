import { Controller, Post, Body, Delete, Param, ParseIntPipe, Get } from '@nestjs/common';
import { UserService } from '@/modules/users/services/user.service';
import { ApiOperation } from '@nestjs/swagger';
import { SaveJobDto } from '../dtos/save-job.dto';
import { UserAuth } from '@/modules/auth/common/jwt.decorator';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';

@ApiBearerAndTags('Favorite')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save-job')
  @ApiOperation({ summary: 'Lưu job khi user (like/tym) job' })
  async likeJob(
    @UserAuth('id') userId: number,
    @Body() saveJobDto: SaveJobDto,
  ) {
    return await this.userService.likeJob(userId, saveJobDto.jobId);
  }

  @Delete('save-job/:jobId')
  @ApiOperation({ summary: 'Bỏ lưu job khi user unlike job' })
  async unlikeJob(
    @UserAuth('id') userId: number,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    return await this.userService.unlikeJob(userId, jobId);
  }

  @Get('saved-jobs')
  @ApiOperation({ summary: 'Lấy danh sách các job đã lưu của user' })
  async getSavedJobs(@UserAuth('id') userId: number) {
    const savedJobs = await this.userService.getSavedJobs(userId);
    return savedJobs;
  }
}
