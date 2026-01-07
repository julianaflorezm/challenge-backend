import { GetCompaniesService } from "src/domain/company/service/get-companies-service";
import { CompanyRepository } from "src/domain/company/port/repository/CompanyRepository";
import { TransferRepository } from '../../../../domain/transfer/port/repository/TransferRepository';

export function getCompaniesServiceProvider(companyRepostory: CompanyRepository, transferRepository: TransferRepository) {
  return new GetCompaniesService(companyRepostory, transferRepository);
}
