import { Controller } from '@nestjs/common';
import { SoapService } from './soap.service';

@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  // Aquí se agregarán los métodos expuestos por SOAP
}