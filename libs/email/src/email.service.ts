import { EMAIL, PASSWORD } from '@/utils/common/src';
import { EmailDto } from '@/utils/dtos/src';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(emailDto: EmailDto): Promise<void> {
    const { to, subject, body } = emailDto
    const transporter = nodemailer.createTransport({
      // Configure your email provider settings here
      // Example for using Gmail SMTP
      service: 'Gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    const mailOptions = {
      from: EMAIL,
      to,
      subject,
      text:body,
    };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error.message);
    //   }
    //   console.log('success');
    // });
  }
}
