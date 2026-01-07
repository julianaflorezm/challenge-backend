import { Company } from "./company";

export class CorporateCompany extends Company {
   getType(): string {
    return 'CORPORATE'
   }
}