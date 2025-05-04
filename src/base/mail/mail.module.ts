import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from '@/config/config.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from '@/base/mail/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        requireTLS: config.EMAIL_USE_TLS,
        secure: false,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASSWORD,
        },
      },
      template: {
        dir: join(process.cwd(), 'src', 'base', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
