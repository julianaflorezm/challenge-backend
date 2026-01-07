import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../../../domain/company/port/repository/CompanyRepository';
import { Company } from '../../../../domain/company/model/company';

@Injectable()
export class ArrCompanyRepository implements CompanyRepository {

  private companies: Company[] = [];

  async save(company: Company) {
    this.companies.push(company);
    
  }

  async findById(id: string) {    
    return this.companies.find(c => c.getId() === id) ?? null;
  }

  async findByIds(ids: string[]) {
    const set = new Set(ids);
    return this.companies.filter(c => set.has(c.getId()));
  }


}
