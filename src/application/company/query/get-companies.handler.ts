import { Injectable } from '@nestjs/common';
import { GetCompaniesService } from '../../../domain/company/service/get-companies-service';
import { GetCompanyByTransferQuery } from './get-companies-count.query';

@Injectable()
export class GetCompaniesHandler {
  constructor(private _getCompaniesService: GetCompaniesService) {}

  async run(): Promise<GetCompanyByTransferQuery[]> {
    return await this._getCompaniesService.run();
  }
}
