import { CompanyRepository } from '../port/repository/CompanyRepository';
import { Company } from '../model/company';
import { TransferRepository } from 'src/domain/transfer/port/repository/TransferRepository';
import { GetCompanyByTransferQuery } from 'src/application/company/query/get-companies-count.query';

export class GetCompaniesService {
  constructor(
    private readonly _companyRepository: CompanyRepository,
    private readonly _transferRepository: TransferRepository
  ) {}

  async run(): Promise<GetCompanyByTransferQuery[]> {
   const companyIds = await this._transferRepository.findCompanyIdsWithTransfersLastMonth();

    const companies = await this._companyRepository.findByIds(companyIds);

    const counts = await this._transferRepository.countByCompanyIdsLastMonth(
      companies.map(c => c.getId()),
    );

    return companies.map(c => ({
      id: c.getId(),
      name: c.getName(),
      type: c.getType(),
      transfersLastMonthCount: counts[c.getId()] ?? 0,
    }));
  }
}
