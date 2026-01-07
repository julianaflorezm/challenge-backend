import { CompanyType, RegisterCompanyCommand } from '../../../application/company/command/register-company.command';
import { PymeCompany } from '../model/payme-company';
import { randomUUID } from 'crypto';
import { CorporateCompany } from '../model/corporate-company';
import { CompanyRepository } from '../port/repository/CompanyRepository';

export class RegisterCompanyService {
  constructor(
    private readonly _companyRepository: CompanyRepository,
  ) {}

  async run(dto: RegisterCompanyCommand): Promise<{ created: { id: string}}> {
    const company = dto.type === CompanyType.PYME 
      ? new PymeCompany(randomUUID(), dto.name, new Date())
      : new CorporateCompany(randomUUID(), dto.name, new Date());
    this._companyRepository.save(company);
    return { created: { id: company.getId() }}
  }
}
