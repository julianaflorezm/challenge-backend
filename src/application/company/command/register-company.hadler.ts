import { Injectable } from '@nestjs/common';
import { RegisterCompanyCommand } from './register-company.command';
import { RegisterCompanyService } from '../../../domain/company/service/register-company-service';

@Injectable()
export class RegisterCompanyHandler {
  constructor(private _registerCompanyService: RegisterCompanyService) {}

  async run(dto: RegisterCompanyCommand): Promise<{ created: { id:  string }}> {
    return await this._registerCompanyService.run(dto);
  }
}
