import { CompanyRepository } from "src/domain/company/port/repository/CompanyRepository";
import { RegisterCompanyService } from "src/domain/company/service/register-company-service";

export function registerCompanyServiceProvider(
  companyRepository: CompanyRepository,
) {
  return new RegisterCompanyService(companyRepository);
}
