import { HttpException, HttpStatus } from '@nestjs/common';

export class BussinessError extends HttpException {
  constructor(mensaje: string, status: HttpStatus, clase?: string) {
    super(mensaje, status);
    this.name = clase || BussinessError.name;
  }
}
