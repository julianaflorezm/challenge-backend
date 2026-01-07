import { Company } from "../../model/company";

export abstract class CompanyRepository {
    abstract save(company: Company): Promise<void>;
    abstract findById(id: string): Promise<Company | null>;
    abstract findByIds(ids: string[]): Promise<Company[]>;
}