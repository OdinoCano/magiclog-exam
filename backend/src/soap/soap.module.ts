import { Module } from '@nestjs/common';
import { SoapService } from './soap.service';
import { SoapController } from './soap.controller';

@Module({
  providers: [SoapService],
  controllers: [SoapController],
})
export class SoapModule {}