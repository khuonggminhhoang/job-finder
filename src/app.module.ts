import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/migrations/ormconfig.migration';
import { SeederModule } from '@/migrations/seed/seeder.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/users/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@/config/config.module';
import { JwtAuthGuard } from '@/modules/auth/common/jwt.guard';
import { JobCategoryModule } from '@/modules/job-categories/job-category.module';
import { CompanyModule } from '@/modules/companies/company.module';
import { JobModule } from '@/modules/jobs/job.module';
import { ApplicationModule } from '@/modules/applications/application.module';
import { NotificationModule } from '@/modules/notifications/notification.module';
import { SkillModule } from '@/modules/skills/skill.module';

@Module({
  imports: [
    // global module
    ConfigModule,

    // app module
    AuthModule,
    UserModule,
    JobCategoryModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
    NotificationModule,
    SkillModule,

    // core module
    SeederModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
