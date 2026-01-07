import { CompanyRepository } from '../../../../domain/company/port/repository/CompanyRepository';
import { ArrCompanyRepository } from '../../adapter/repository/arr-company-repository';

export const companyRepositoryProvider = {
  provide: CompanyRepository,
  useClass: ArrCompanyRepository,
};
