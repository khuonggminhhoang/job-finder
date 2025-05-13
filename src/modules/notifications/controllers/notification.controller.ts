import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBearerAndTags } from '@/base/swagger/swagger.decorator';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from '@/modules/notifications/dtos/notification.dto';
import { SkipAuth, UserAuth } from '@/modules/auth/common/jwt.decorator';

@ApiBearerAndTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả thông báo của user hiện tại' })
  findAll() {
    return this.notificationService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết thông báo' })
  findOne(@Param('id') id: number, @UserAuth('id') userId: number) {
    return this.notificationService.getOneBy({ id, userId });
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Đánh dấu thông báo là đã đọc' })
  markAsRead(@Param('id') id: number, @UserAuth('id') userId: number) {
    return this.notificationService.markAsRead(+id, userId);
  }

  @Patch('/read-all')
  @ApiOperation({ summary: 'Đánh dấu tất cả thông báo là đã đọc' })
  markAllAsRead(@UserAuth('id') userId: number) {
    return this.notificationService.markAllAsRead(userId);
  }
}

@ApiTags('Notifications - System')
@SkipAuth()
@Controller('notifications')
export class NotificationPublicController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới một thông báo' })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Cập nhật một thông báo' })
  update(@Param('id') id: number, @Body() dto: UpdateNotificationDto) {
    return this.notificationService.updateOneBy({ id }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa một thông báo notification' })
  remove(@Param('id') id: number) {
    return this.notificationService.softDeleteById(id);
  }
}
