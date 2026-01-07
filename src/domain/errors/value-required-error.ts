import { BussinessError } from './bussiness-error';
import { HttpStatus } from '@nestjs/common';

export class ValueRequiredError extends BussinessError {
  constructor(mensaje: string, status: HttpStatus) {
    super(mensaje, status);
  }
}
