import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email Sending')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({
    summary: 'TEST: envía un email con un mensaje personalizado',
  })
  @Get('test')
  send_email(@Query('email') email: string, @Query('message') message: string) {
    return this.emailService.sendEmail(email, message);
  }

  @ApiOperation({
    summary: 'TEST: envía un email de compra',
  })
  @Get('successPurchase')
  send_success(@Query('email') email: string) {
    return this.emailService.sendPurchaseEmail(
      email,
      Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    );
  }
}
