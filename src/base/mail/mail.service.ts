import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from '@/config/config.service';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    receiver: string,
    subject: string,
    text?: string,
    template?: string,
    context?: Record<string, any>,
  ): Promise<SentMessageInfo> {
    return this.mailerService
      .sendMail({
        to: receiver,
        from: `Job Finder <${config.EMAIL_FROM_ADDRESS}>`,
        subject: subject.toUpperCase(),
        text: text,
        template: template,
        context: context,
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
